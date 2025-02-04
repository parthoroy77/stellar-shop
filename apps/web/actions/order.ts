"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { revalidateTag } from "next/cache";

export const placeOrder = async () => {
  const result = await serverFetcher<{ redirectUrl: string }>("/orders/place", { method: "POST" });

  if (result.success) {
    revalidateTag("my-cart");
  }

  return result;
};
