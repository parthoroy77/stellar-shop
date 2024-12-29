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
        cart: {
          connectOrCreate: {
            where: { userId },
            create: { userId },
          },
        },
      },
    });

    return {
      message: "Product added to cart successfully!",
      status: 201,
    };
  }
};

export const CartServices = { addToCart };