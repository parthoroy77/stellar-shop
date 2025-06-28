import prisma from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { redisInstance } from "../../../server";
import config from "../../config";
import { PLATFORM_FEE } from "../../constants";
import { ApiError } from "../../handlers/ApiError";
import { ANALYTICS_BASE_CACHE_KEY, ANALYTICS_SELLER_CACHE_TTL } from "./analytics.constants";

const sellerAnalytics = async (userId: number) => {
  const seller = await prisma.seller.findUnique({
    where: {
      userId,
    },
    select: { id: true, status: true },
  });

  if (!seller) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Seller not found!");
  }

  if (seller.status !== "ACTIVE") {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Seller is not active!");
  }

  const cacheKey = ANALYTICS_BASE_CACHE_KEY + ":seller:" + seller.id;

  if (config.use_redis && redisInstance) {
    const cacheResult = await redisInstance.get(cacheKey);
    if (cacheResult) {
      return JSON.parse(cacheResult);
    }
  }

  const subOrders = await prisma.subOrder.findMany({
    where: {
      sellerId: seller.id,
      status: "DELIVERED",
    },
    select: {
      id: true,
      netAmount: true,
    },
  });

  const totalSales = subOrders.reduce((acc, order) => (acc += order.netAmount.toNumber()), 0);
  const totalActiveProducts = await prisma.product.count({ where: { sellerId: seller.id, status: "ACTIVE" } });
  const totalOrders = subOrders.length;
  const platformFee = totalSales * (PLATFORM_FEE / 100);
  const netEarning = totalSales - platformFee;

  if (config.use_redis && redisInstance) {
    await redisInstance.setex(
      cacheKey,
      ANALYTICS_SELLER_CACHE_TTL,
      JSON.stringify({ totalSales, totalOrders, netEarning, totalActiveProducts, platformFee })
    );
  }

  return { totalSales, totalOrders, netEarning, totalActiveProducts, platformFee };
};

export const AnalyticsServices = { sellerAnalytics };
