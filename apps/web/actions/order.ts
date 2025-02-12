"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { TOrder } from "@repo/utils/types";
import { revalidateTag } from "next/cache";

export const placeOrder = async () => {
  const result = await serverFetcher<{ redirectUrl: string }>("/orders/place", { method: "POST" });

  if (result.success) {
    revalidateTag("my-cart");
    revalidateTag("my-orders");
  }

  return result;
};

export const getMyOrders = async () => {
  const result = await serverFetcher<TOrder[]>("/orders/buyer", {
    method: "GET",
    next: { revalidate: 30, tags: ["my-orders"] },
  });

  return { data: result.data, meta: result.meta };
};
