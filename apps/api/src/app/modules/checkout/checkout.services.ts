import prisma from "@repo/prisma/client";
import { TProduct } from "@repo/utils/types";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { TCheckoutInitiatePayload, TCheckoutSession } from "./checkout.types";
import { initialCheckoutProductSelectArgs } from "./checkout.utils";

const initiateCheckout = async ({ cartItemIds, checkoutProduct }: TCheckoutInitiatePayload, userId: number) => {
  // Initialize the checkout session with default values
  const checkoutSession: TCheckoutSession = {
    order: {
      totalAmount: 0,
      grossAmount: 0,
      netAmount: 0,
      shippingAmount: 0,
      discountAmount: 0,
    },
    packages: [],
    paymentMethodId: null,
    shippingAddress: null,
  };

  /**
   * Processes the checkout products and updates the checkout session.
   * @param payload - Array of products to process
   * @param products - Array of fetched product details
   */
  const processCheckoutProduct = (
    payload: { productId: number; quantity: number; productVariantId?: number | null }[],
    products: TProduct[]
  ) => {
    const isStockOut = products.some((product) => {
      const cartItem = payload.find((item) => item.productId === product.id);
      if (!cartItem) return false;
      const selectedVariant = product.variants.find((variant) =>
        cartItem.productVariantId ? variant.id === cartItem.productVariantId : variant.isDefault
      );

      return selectedVariant ? selectedVariant.stock < cartItem.quantity : product.stock < cartItem.quantity;
    });

    if (isStockOut) {
      throw new ApiError(StatusCodes.CONFLICT, "Some products are out of stock!");
    }

    payload.forEach((cart) => {
      const product = products.find((product) => product.id === cart.productId);

      if (!product) return;

      const variant = cart.productVariantId ? product?.variants.find((v) => v.id === cart.productVariantId) : null;

      if (variant) {
        checkoutSession.order.totalAmount += variant.price * cart.quantity;
      } else {
        checkoutSession.order.totalAmount += product.price * cart.quantity;
      }

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
        sellerPackage.items.push({
          ...(product as unknown as TProduct),
          quantity: cart.quantity,
        });
      }

      if (sellerPackage.shippingOptions.length === 0) {
        sellerPackage.shippingOptions = product.shippingOptions.map((pso) => pso.option);
      } else {
        sellerPackage.shippingOptions = sellerPackage.shippingOptions.filter((existingOption) =>
          product.shippingOptions.some((productOption) => productOption.option.id === existingOption.id)
        );
      }
      checkoutSession.packages = checkoutSession.packages.filter((p) => p.shippingOptions.length > 0);
    });
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

    if (!cartItems.length) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Cart items not found!");
    }

    // Fetch products related to cart items
    const cartProducts = await prisma.product.findMany({
      where: {
        id: { in: cartItems.map((item) => item.productId) },
        status: "ACTIVE",
      },
      select: initialCheckoutProductSelectArgs({
        OR: cartItems.flatMap((item) => [
          item.productVariantId
            ? {
                id: +item.productVariantId,
              }
            : {
                isDefault: true,
              },
        ]),
      }),
    });

    if (cartProducts.some((product) => !cartItemIds.includes(product.id))) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Some products in the cart are unavailable!");
    }

    processCheckoutProduct(
      cartItems.map((cart) => {
        if (cart.productVariantId) {
          return {
            quantity: cart.quantity,
            productId: cart.productId,
            productVariantId: cart.productVariantId,
          };
        } else {
          return {
            quantity: cart.quantity,
            productId: cart.productId,
          };
        }
      }),
      cartProducts as unknown as TProduct[]
    );
  } else if (checkoutProduct) {
    // Validate checkout product input
    if (!checkoutProduct.productId || !checkoutProduct.quantity) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Invalid checkout product payload!");
    }

    // Fetch a single product for direct checkout
    const product = await prisma.product.findUnique({
      where: { id: +checkoutProduct.productId, status: "ACTIVE" },
      select: initialCheckoutProductSelectArgs(
        checkoutProduct.productVariantId
          ? {
              id: +checkoutProduct.productVariantId,
            }
          : {
              isDefault: true,
            }
      ),
    });

    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found!");
    }

    processCheckoutProduct(
      [
        {
          quantity: +checkoutProduct.quantity,
          productId: +checkoutProduct.productId,
          productVariantId: checkoutProduct.productVariantId ? +checkoutProduct.productVariantId : null,
        },
      ],
      [product as unknown as TProduct]
    );

    const { totalAmount, discountAmount } = checkoutSession.order;
    checkoutSession.order.grossAmount += totalAmount + discountAmount;
  } else {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid checkout request!");
  }
};

export const CheckoutServices = { initiateCheckout };
