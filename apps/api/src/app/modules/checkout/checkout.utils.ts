import { Prisma } from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { redisInstance } from "../../../server";
import { ApiError } from "../../handlers/ApiError";
import { CHECKOUT_SESSION_CACHE_PREFIX } from "./checkout.constants";
import { TCheckoutSession } from "./checkout.types";

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

export const getCheckoutSession = async (userId: number) => {
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
  return checkoutSession;
};
