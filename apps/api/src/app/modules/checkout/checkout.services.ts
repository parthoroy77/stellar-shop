import prisma, { PaymentMethod, ShippingAddress } from "@repo/prisma/client";
import {
  TCheckoutInitiatePayload,
  TCheckoutSessionData,
  TCheckoutUpdatePayload,
  TPackage,
  TProduct,
} from "@repo/utils/types";
import { StatusCodes } from "http-status-codes";
import { redisInstance } from "../../../server";
import config from "../../config";
import { ApiError } from "../../handlers/ApiError";
import { CHECKOUT_SESSION_CACHE_TIME } from "./checkout.constants";
import { TCheckoutSession } from "./checkout.types";
import { getCheckoutCacheKey, initialCheckoutProductSelectArgs, parseSessionData } from "./checkout.utils";

const initiateCheckout = async ({ cartItemIds, checkoutProduct }: TCheckoutInitiatePayload, userId: number) => {
  // Initialize the checkout session with default values
  const checkoutSession: TCheckoutSession = {
    packages: [],
    paymentMethodId: null,
    shippingAddress: null,
  };
  const cacheKey = getCheckoutCacheKey(userId);
  if (!redisInstance) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while performing task!");
  }
  // Clear any existing cached checkout session before initiating a new one
  await redisInstance.del(cacheKey);
  /**
   * Processes the checkout products and updates the checkout session.
   * Ensures stock availability and groups products by seller.
   * @param payload - Array of products to process (with quantity & variant IDs)
   * @param products - Fetched product details from DB
   */
  const processCheckoutProduct = (
    payload: { productId: number; quantity: number; productVariantId?: number | null }[],
    products: TProduct[]
  ) => {
    const isStockOut = payload.some(({ productId, productVariantId, quantity }) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return false;

      const variant = productVariantId
        ? product.variants.find((v) => v.id === productVariantId)
        : product.variants.find((v) => v.isDefault);
      return variant ? variant.stock < quantity : product.stock < quantity;
    });

    if (isStockOut) {
      throw new ApiError(StatusCodes.CONFLICT, "Some products are out of stock!");
    }

    // Group products by seller and calculate total amount
    payload.forEach(({ productId, quantity, productVariantId }) => {
      const product = products.find((p) => p.id === productId);

      if (!product) return;

      let sellerPackage = checkoutSession.packages.find((p) => p.sellerId === product.sellerId);

      if (!sellerPackage) {
        sellerPackage = {
          ...product.seller,
          sellerId: product.sellerId,
          items: [],
          shippingOptions: [],
          selectedShippingOption: null,
        };
        checkoutSession.packages.push(sellerPackage);
      }

      sellerPackage.items.push({
        productId,
        productVariantId: productVariantId ?? null,
        quantity,
      });

      if (!sellerPackage.shippingOptions.length) {
        sellerPackage.shippingOptions = product.shippingOptions.map((pso) => pso.option.id);
      } else {
        sellerPackage.shippingOptions = sellerPackage.shippingOptions.filter((existingOptionId) =>
          product.shippingOptions.some((pso) => pso.option.id === existingOptionId)
        );
      }
    });

    // Remove packages with no shipping options
    checkoutSession.packages = checkoutSession.packages.filter((p) => p.shippingOptions.length > 0);
  };

  // Handle checkout from cart
  if (cartItemIds?.length) {
    // Fetch cart items based on provided IDs
    const cartItems = await prisma.cartItem.findMany({
      where: {
        id: { in: cartItemIds.map(Number) },
        userId,
      },
    });

    // Ensure all provided cartItemIds exist in the database
    if (!cartItemIds.every((id) => cartItems.some((item) => item.id === id))) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Some cart items not found!");
    }

    // Fetch products associated with the cart items
    const cartProducts = await prisma.product.findMany({
      where: {
        id: { in: cartItems.map((item) => item.productId) },
        status: "ACTIVE",
      },
      select: initialCheckoutProductSelectArgs({
        OR: cartItems.flatMap((item) => [
          item.productVariantId
            ? {
                id: item.productVariantId,
              }
            : {
                isDefault: true,
              },
        ]),
      }),
    });

    // Ensure every cart item has a valid product
    if (!cartItems.every((item) => cartProducts.some((product) => product.id === item.productId))) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Some products in the cart are unavailable!");
    }

    // Process the checkout session
    processCheckoutProduct(
      cartItems.map(({ productId, quantity, productVariantId }) => ({
        productId,
        quantity,
        productVariantId: productVariantId ?? null,
      })),
      cartProducts as unknown as TProduct[]
    );
  }
  // Handle direct product checkout
  else if (checkoutProduct) {
    const { productId, quantity, productVariantId } = checkoutProduct;

    // Validate checkout product input
    if (!productId || !quantity) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Invalid checkout product payload!");
    }

    // Fetch product for direct checkout
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
        status: "ACTIVE",
      },
      select: initialCheckoutProductSelectArgs(productVariantId ? { id: productVariantId } : { isDefault: true }),
    });

    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found!");
    }

    // Process the checkout session
    processCheckoutProduct(
      [{ productId: productId, quantity: quantity, productVariantId: productVariantId ? productVariantId : null }],
      [product as unknown as TProduct]
    );
  }
  // Invalid checkout request
  else {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid checkout request!");
  }

  // Start a multi-batch operation
  const multi = redisInstance.multi();

  // Insert all the products and sellers into Redis as individual hash fields
  for (const [field, value] of Object.entries(checkoutSession)) {
    // Store each product or seller as a separate field in the hash
    multi.hset(cacheKey, field, JSON.stringify(value));
  }

  if (config.NODE_ENV === "production") {
    // Set expiration for the entire hash key (the checkout session)
    multi.expire(cacheKey, CHECKOUT_SESSION_CACHE_TIME);
  }

  // Execute all the Redis commands (hset and expire) in one batch
  await multi.exec();
};

const getSession = async (userId: number): Promise<TCheckoutSessionData> => {
  // Generate a unique cache key for the user's checkout session
  const cacheKey = getCheckoutCacheKey(userId);

  if (!redisInstance) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error!");
  }

  // Retrieve checkout session data from Redis cache
  const strCache = await redisInstance.hgetall(cacheKey);

  if (!strCache || !Object.keys(strCache).length) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No checkout session found!");
  }

  // Parse the session data and ensure correct structure
  const checkoutSession = parseSessionData(strCache) as TCheckoutSession;

  // Arrays to store IDs for database queries
  const productIds: number[] = [];
  const productVariantIds: number[] = [];
  const shippingOptionIds: number[] = [];

  // Arrays to store IDs for database queries
  checkoutSession.packages.forEach((pack) => {
    pack.items.forEach((item) => {
      productIds.push(item.productId);
      if (item.productVariantId) {
        productVariantIds.push(item.productVariantId);
      }
      shippingOptionIds.push(...pack.shippingOptions);
    });
  });

  // Fetch product details from the database
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      productName: true,
      sellerId: true,
      price: true,
      images: {
        take: 1,
        select: { file: { select: { fileSecureUrl: true } } },
      },
      attributes: {
        select: {
          attributeValue: {
            select: {
              id: true,
              value: true,
              attribute: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
      seller: {
        select: {
          shopName: true,
          logo: {
            select: {
              fileSecureUrl: true,
            },
          },
        },
      },
    },
  });

  if (!productIds.every((id) => products.some((p) => p.id === id))) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Products not found!");
  }

  // Fetch product variants from the database if needed
  let variantsMap = new Map<number, any>();
  if (productVariantIds.length) {
    const variants = await prisma.productVariant.findMany({
      where: {
        id: {
          in: productVariantIds,
        },
      },
      select: {
        id: true,
        productId: true,
        price: true,
        attributes: {
          select: {
            attributeValue: {
              select: {
                id: true,
                value: true,
                attribute: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Store product variants in a map for quick lookup
    variants.forEach((v) => {
      variantsMap.set(v.id, v);
    });
  }

  // Convert product list to a map for quick lookup
  const productMap = new Map(products.map((p) => [p.id, p]));

  // Fetch shipping options from the database
  let shippingOptionsMap = new Map<number, any>();
  if (shippingOptionIds.length) {
    const shippingOptions = await prisma.shippingOption.findMany({
      where: { id: { in: shippingOptionIds } },
      select: {
        id: true,
        name: true,
        charge: true,
        estimateDays: true,
      },
    });

    // Store shipping options in a map for quick lookup
    shippingOptions.forEach((option) => {
      shippingOptionsMap.set(option.id, option);
    });
  }

  // Initialize an array to store structured package data
  const packages: TPackage[] = [];

  // Process checkout session packages and organize data
  checkoutSession.packages.forEach((pack) => {
    // Retrieve valid shipping options
    const sellerPackage = packages.find((p) => p.sellerId === pack.sellerId);

    const shippingOptions = pack.shippingOptions.map((id) => shippingOptionsMap.get(id)).filter(Boolean); // Ensure only valid options are included

    // Check if a package for the seller already exists
    if (!sellerPackage) {
      // Create a new seller package if not found
      packages.push({
        sellerId: pack.sellerId,
        ...productMap.get(pack.items[0]?.productId!)?.seller!, // Get seller info
        selectedShippingOption: pack.selectedShippingOption
          ? pack.selectedShippingOption // If selected shipping option is available return that.
          : shippingOptions.length
            ? shippingOptions[0].id
            : null, // Default to first shipping option
        items: pack.items.map((item) => ({
          ...item,
          ...((productMap.get(item.productId) || null) as unknown as TProduct),
          variant: item.productVariantId ? variantsMap.get(item.productVariantId) : null,
          quantity: item.quantity,
        })),
        shippingOptions,
      });
    } else {
      // Add items to the seller package
      sellerPackage.items.push(
        ...pack.items.map((item) => ({
          ...((productMap.get(item.productId) || null) as unknown as TProduct),
          variant: item.productVariantId ? variantsMap.get(item.productVariantId) : null,
          quantity: item.quantity,
        }))
      );
    }
  });

  let shippingAddress: Partial<ShippingAddress> | null = null;
  let paymentMethod: Pick<PaymentMethod, "methodName" | "id"> | null = null;
  if (checkoutSession.shippingAddress) {
    shippingAddress = await prisma.shippingAddress.findUnique({
      where: { id: +checkoutSession.shippingAddress },
      omit: { createdAt: true, updatedAt: true },
    });
  }
  if (checkoutSession.paymentMethodId) {
    paymentMethod = await prisma.paymentMethod.findUnique({
      where: { id: +checkoutSession.paymentMethodId, status: "ACTIVE" },
      select: { id: true, methodName: true, description: true },
    });
  }

  return {
    packages: packages,
    shippingAddress,
    paymentMethod,
  };
};

const update = async (
  { type, shippingAddressId, shippingOption, paymentMethodId }: TCheckoutUpdatePayload,
  userId: number
) => {
  // Generate a unique cache key for the user's checkout session
  const cacheKey = getCheckoutCacheKey(userId);

  if (!redisInstance) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error!");
  }

  const strCache = await redisInstance.hgetall(cacheKey);

  if (!strCache || !Object.keys(strCache).length) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No checkout session found!");
  }

  const checkoutSession = parseSessionData(strCache) as TCheckoutSession;

  // Helper function to update Redis
  const updateRedis = async (field: string, value: unknown, message: string) => {
    await redisInstance!.hset(cacheKey, field, JSON.stringify(value));
    return { statusCode: StatusCodes.OK, message };
  };

  // Helper function to return up to date
  const defaultReturn = () => {
    return { statusCode: StatusCodes.NO_CONTENT, message: "Everything is up to date!" };
  };

  switch (type) {
    case "paymentMethodUpdate":
      if (checkoutSession.paymentMethodId === paymentMethodId) {
        defaultReturn();
      }

      // Validate payment method exists
      const paymentMethod = await prisma.paymentMethod.findUnique({
        where: { id: paymentMethodId, status: "ACTIVE" },
        select: { id: true },
      });

      if (!paymentMethod) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Invalid payment method");
      }

      return updateRedis("paymentMethodId", paymentMethod.id, "Payment method updated!");

    case "shippingAddressUpdate":
      if (checkoutSession.shippingAddress === shippingAddressId) {
        defaultReturn();
      }

      // Validate shipping address exists
      const shippingAddress = await prisma.shippingAddress.findUnique({
        where: { id: shippingAddressId, userId },
        select: { id: true },
      });

      if (!shippingAddress) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Shipping address not found!");
      }

      return updateRedis("shippingAddress", shippingAddress.id, "Shipping address updated!");

    case "shippingOptionUpdate":
      if (!shippingOption) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid shipping option!");
      }

      const { sellerId, shippingOptionId } = shippingOption;
      const [seller, option] = await Promise.all([
        prisma.seller.findUnique({ where: { id: sellerId, status: "ACTIVE" }, select: { id: true } }),
        prisma.shippingOption.findUnique({ where: { id: shippingOptionId }, select: { id: true } }),
      ]);
      const updatedPackages = checkoutSession.packages.map((pack) =>
        pack.sellerId === sellerId ? { ...pack, selectedShippingOption: shippingOptionId } : pack
      );

      if (!seller) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Seller not found!");
      }

      if (!option) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Invalid shipping option!");
      }

      // If nothing changed, return early
      if (JSON.stringify(updatedPackages) === JSON.stringify(checkoutSession.packages)) {
        defaultReturn();
      }

      return updateRedis("packages", updatedPackages, "Shipping option updated!");

    default:
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid update type!");
  }
};

export const CheckoutServices = { initiateCheckout, getSession, update };
