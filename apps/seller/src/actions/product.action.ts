"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { TProduct } from "@repo/utils/types";
import { revalidateTag } from "next/cache";

export const uploadProduct = async (data: FormData) => {
  const result = await serverFetcher("/products", { method: "POST", body: data });
  if (result.success) {
    revalidateTag("products");
  }
  return result;
};

export const getAllProducts = async (sellerId: number) => {
  const result = await serverFetcher<TProduct[]>("/products/seller/" + sellerId, {
    method: "GET",
    next: { tags: ["products"], revalidate: 200 },
  });
  return { data: result.data, meta: result.meta };
};
