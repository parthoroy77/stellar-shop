import prisma from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { TAddToWishlistInput } from "./wishlist.types";

const toggleWishlist = async ({ userId, productId, variantId }: TAddToWishlistInput) => {
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
    productVariantId = product.variants[0]!.id;
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

  // Check if the product already exists in wishlist
  const wishlistItem = await prisma.wishlistItem.findFirst({
    where: {
      productId: product.id,
      productVariantId,
      userId,
    },
  });

  // if exists then delete that
  if (wishlistItem) {
    await prisma.wishlistItem.delete({
      where: {
        id: wishlistItem.id,
      },
    });
    return {
      message: "Product removed from wishlist wishlist!",
      status: StatusCodes.OK,
    };
  } else {
    await prisma.wishlistItem.create({
      data: {
        productId,
        userId,
        productVariantId,
        wishlist: {
          connectOrCreate: {
            where: { userId },
            create: { userId },
          },
        },
      },
    });

    return {
      message: "Product added to wishlist successfully!",
      status: StatusCodes.CREATED,
    };
  }
};

export const WishlistServices = {
  toggleWishlist,
};
