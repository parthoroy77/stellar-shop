"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { TSellerAnalytics } from "@repo/utils/types";

export const getAnalytics = async (): Promise<TSellerAnalytics> => {
  const result = await serverFetcher<TSellerAnalytics>("/analytics/seller", {
    next: { revalidate: 60, tags: ["analytics"] },
  });
  return result.data || { totalActiveProducts: 0, totalOrders: 0, totalSales: 0, netEarning: 0, platformFee: 0 };
};
