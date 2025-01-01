import prisma from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { TAddToCartInput } from "./cart.types";

const addToCart = async ({ userId, quantity, productId, variantId }: TAddToCartInput) => {
  const user = await prisma.user.findUnique({
    where: { id: userId, status: "ACTIVE" },
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found!");
  }
  const cart = await prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      variants: { where: { isDefault: true }, select: { id: true } },
    },
  });

  if (!product) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Product not found!");
  }

  let productVariantId: number | null = null;

  // Case 1: Product has a variant and no `variantId` is provided
  if (!variantId && product.variants.length > 0) {
    productVariantId = product.variants[0]!.id; // Default variant
  }

  // Case 2: Product has a variant and `variantId` is provided
  if (variantId) {
    const variantExists = await prisma.productVariant.findUnique({
      where: { id: variantId, productId },
    });

    if (!variantExists) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Invalid variant for the product!");
    }
    productVariantId = variantId;
  }

  // Case 3: Product does not have any variants
  // `productVariantId` remains `null`

  // Create Cart (if exist then just connect)

  // Check if the cart item already exists for this product or variant
  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      productId: product.id,
      productVariantId,
      userId,
    },
  });

  // if exist already update or create
  if (existingCartItem) {
    // Update the quantity of the existing cart item
    await prisma.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: existingCartItem.quantity + quantity, // Add the new quantity to the existing quantity
      },
    });
    return {
      message: "Cart updated successfully!",
      status: 200,
    };
  } else {
    await prisma.cartItem.create({
      data: {
        productId,
        userId,
        quantity,
        productVariantId,
        cartId: cart.id,
      },
    });

    return {
      message: "Product added to cart successfully!",
      status: 201,
    };
  }
};

const getUserCart = async (userId: number) => {
  const result = await prisma.cart.findUnique({
    where: {
      userId,
    },
    select: {
      cartItems: {
        select: {
          id: true,
          quantity: true,
          productId: true,
          productVariantId: true,
          product: {
            select: {
              id: true,
              uniqueId: true,
              urlSlug: true,
              productName: true,
              price: true,
              stock: true,
              images: {
                take: 1,
                select: {
                  file: { select: { fileSecureUrl: true } },
                },
              },
            },
          },
          productVariant: {
            select: {
              id: true,
              uniqueId: true,
              variantName: true,
              attributes: { select: { attributeValue: { select: { value: true } } } },
            },
          },
        },
      },
    },
  });

  return result;
};

const clearUserCart = async (userId: number) => {
  await prisma.cart.delete({ where: { userId } });
};

const deleteUserCartItem = async (carItemId: number, userId: number) => {
  await prisma.cartItem.delete({ where: { id: carItemId, userId } });
};

export const CartServices = { addToCart, getUserCart, clearUserCart, deleteUserCartItem };
