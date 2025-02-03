import prisma from "@repo/prisma/client";
import { TProduct } from "@repo/utils/types";
import { StatusCodes } from "http-status-codes";
import { redisInstance } from "../../../server";
import { ApiError } from "../../handlers/ApiError";
import { CHECKOUT_SESSION_CACHE_PREFIX, CHECKOUT_SESSION_CACHE_TIME } from "./checkout.constants";
import { TCheckoutInitiatePayload, TCheckoutSession } from "./checkout.types";
import { initialCheckoutProductSelectArgs } from "./checkout.utils";

const initiateCheckout = async ({ cartItemIds, checkoutProduct }: TCheckoutInitiatePayload, userId: number) => {
  // Initialize the checkout session with default values
  const checkoutSession: TCheckoutSession = {
    packages: [],
    paymentMethodId: null,
    shippingAddress: null,
  };
  const cacheKey = CHECKOUT_SESSION_CACHE_PREFIX + userId.toString();
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

  // Store the checkout session in Redis cache for 10 minutes
  await redisInstance.setex(cacheKey, CHECKOUT_SESSION_CACHE_TIME, JSON.stringify(checkoutSession));
};

export const CheckoutServices = { initiateCheckout };
