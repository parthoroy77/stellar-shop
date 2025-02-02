import prisma, { CartItem } from "@repo/prisma/client";
import { TProduct } from "@repo/utils/types";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { TCheckoutInitiatePayload, TCheckoutSession } from "./checkout.types";

const initiate = async ({ cartItemIds, checkoutProduct }: TCheckoutInitiatePayload, userId: number) => {
  let products: Partial<TProduct>[] = [];
  let cartItems: CartItem[] = [];
  const checkoutSession: Partial<TCheckoutSession> = {
    order: {
      totalAmount: 0,
      grossAmount: 0,
      netAmount: 0,
      shippingAmount: 0,
      discountAmount: 0,
    },
    packages: [],
  };
  if (cartItemIds?.length) {
    // Fetch cart items based on provided IDs
    cartItems = await prisma.cartItem.findMany({
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

    products.push(...(cartProducts as unknown as TProduct[]));
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
        shippingOptions: { select: { option: { select: { charge: true, id: true } } } },
        variants: {
          where: checkoutProduct.productVariantId ? { id: +checkoutProduct.productVariantId } : { isDefault: true },
          select: { id: true, isDefault: true, price: true, stock: true },
        },
      },
    });

    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found!");
    }

    if (checkoutProduct.productVariantId) {
      const selectedVariant = product.variants[0]; // Assuming the variant returned is the one we want

      // Check stock for the selected variant or the default variant
      if (!selectedVariant || selectedVariant.stock < +checkoutProduct.quantity) {
        throw new ApiError(StatusCodes.CONFLICT, "Product is out of stock!");
      }
    } else {
      if (product.stock < +checkoutProduct.quantity) {
        throw new ApiError(StatusCodes.CONFLICT, "Product is out of stock!");
      }
    }

    products.push(product as unknown as TProduct);
  } else {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid checkout request!");
  }
};
