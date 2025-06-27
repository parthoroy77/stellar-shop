"use server";

import { serverFetcher } from "@/lib/server-fetcher";

export const addProductReview = async (data: FormData) => {
  const result = await serverFetcher("/product-reviews", {
    method: "POST",
    body: data,
  });
  return result;
};
