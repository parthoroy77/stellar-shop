"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { ISubOrder } from "@repo/utils/types";

export type TSubOrder = ISubOrder & {
  subOrderItems: number;
};

export const getAllOrders = async (query: string) => {
  const result = await serverFetcher<TSubOrder[]>(`/orders/sellers?${query}`, {
    next: { tags: ["orders"], revalidate: 10 },
  });
  return result.data;
};
