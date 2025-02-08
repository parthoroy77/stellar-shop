"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { ISubOrder, SubOrderStatus } from "@repo/utils/types";
import { revalidateTag } from "next/cache";

export type TSubOrder = ISubOrder & {
  subOrderItems: number;
};

export const getAllOrders = async (query: string) => {
  const result = await serverFetcher<TSubOrder[]>(`/sub-orders?${query}`, {
    next: { tags: ["orders"], revalidate: 10 },
  });
  return { data: result.data, meta: result.meta };
};

export const updateOrderStatus = async (subOrderId: number, status: SubOrderStatus) => {
  const result = await serverFetcher(`/sub-orders/${subOrderId}`, { method: "PUT", body: { status } });
  if (result.success) {
    revalidateTag("orders");
  }

  return result;
};
