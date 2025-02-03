import { Prisma } from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
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

export const parseSessionData = (cachedSession: Record<string, string>) => {
  return Object.fromEntries(
    Object.entries(cachedSession).map(([key, value]) => {
      try {
        return [key, JSON.parse(value)];
      } catch {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal operation failed!");
      }
    })
  );
};
