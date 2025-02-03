import { Prisma } from "@repo/prisma/client";
import { CHECKOUT_SESSION_CACHE_PREFIX } from "./checkout.constants";

export const initialCheckoutProductSelectArgs = (
  variantWhere: Prisma.ProductVariantWhereInput
): Prisma.ProductSelect => {
  return {
    id: true,
    stock: true,
    price: true,
    sellerId: true,
    shippingOptions: {
      select: {
        option: {
          select: {
            id: true,
          },
        },
      },
    },
    variants: {
      where: variantWhere,
      select: {
        id: true,
      },
    },
  };
};

export const getCheckoutCacheKey = (userId: number) => {
  return CHECKOUT_SESSION_CACHE_PREFIX + userId;
};
