import prisma from "@repo/prisma/client";
import { TProduct } from "@repo/utils/types";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { TCheckoutInitiatePayload, TCheckoutSession, TPackage } from "./checkout.types";

const initiateCheckout = async ({ cartItemIds, checkoutProduct }: TCheckoutInitiatePayload, userId: number) => {
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
      select: {
        id: true,
        stock: true,
        price: true,
        sellerId: true,
        shippingOptions: {
          select: {
            option: {
              select: {
                charge: true,
                id: true,
                name: true,
                estimateDays: true,
              },
            },
          },
        },
        variants: {
          where: {
            OR: cartItems.flatMap((item) => [
              item.productVariantId
                ? {
                    id: +item.productVariantId,
                  }
                : {
                    isDefault: true,
                  },
            ]),
          },
          select: {
            id: true,
            price: true,
            stock: true,
            isDefault: true,
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

    if (cartProducts.some((product) => !cartItemIds.includes(product.id))) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Some products in the cart are unavailable!");
    }

    const isStockOut = cartProducts.some((product) => {
      const cartItem = cartItems.find((item) => item.productId === product.id);
      if (!cartItem) return false;
      const selectedVariant = product.variants.find((variant) =>
        cartItem.productVariantId ? variant.id === cartItem.productVariantId : variant.isDefault
      );

      return selectedVariant ? selectedVariant.stock < cartItem.quantity : product.stock < cartItem.quantity;
    });

    if (isStockOut) {
      throw new ApiError(StatusCodes.CONFLICT, "Some products are out of stock!");
    }

    cartItems.forEach((cart) => {
      const product = cartProducts.find((product) => product.id === cart.productId);

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
  } else if (checkoutProduct) {
    // Validate checkout product input
    if (!checkoutProduct.productId || !checkoutProduct.quantity) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Invalid checkout product payload!");
    }

    // Fetch a single product for direct checkout
    const product = await prisma.product.findUnique({
      where: { id: +checkoutProduct.productId, status: "ACTIVE" },
      select: {
        id: true,
        stock: true,
        price: true,
        sellerId: true,
        shippingOptions: {
          select: {
            option: {
              select: {
                name: true,
                estimateDays: true,
                charge: true,
                id: true,
              },
            },
          },
        },
        variants: {
          where: checkoutProduct.productVariantId
            ? {
                id: +checkoutProduct.productVariantId,
              }
            : {
                isDefault: true,
              },
          select: {
            id: true,
            isDefault: true,
            price: true,
            stock: true,
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

    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found!");
    }

    const selectedVariant = product.variants[0];

    if (checkoutProduct.productVariantId) {
      // Check stock for the selected variant or the default variant
      if (!selectedVariant || selectedVariant.stock < +checkoutProduct.quantity) {
        throw new ApiError(StatusCodes.CONFLICT, "Product is out of stock!");
      }
    } else {
      if (product.stock < +checkoutProduct.quantity) {
        throw new ApiError(StatusCodes.CONFLICT, "Product is out of stock!");
      }
    }

    checkoutSession.order.totalAmount +=
      (checkoutProduct.productVariantId ? selectedVariant?.price! : product.price) * +checkoutProduct.quantity;

    const sellerPackage: TPackage = {
      sellerId: product.sellerId,
      ...product.seller,
      shippingOptions: product.shippingOptions.map((pso) => pso.option),
      items: [{ quantity: +checkoutProduct.quantity, ...(product as unknown as TProduct) }],
      selectedShippingOption: null,
    };

    checkoutSession.packages = [sellerPackage];
    const { totalAmount, discountAmount } = checkoutSession.order;
    checkoutSession.order.grossAmount += totalAmount + discountAmount;
  } else {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid checkout request!");
  }
};

export const CheckoutServices = { initiateCheckout };
