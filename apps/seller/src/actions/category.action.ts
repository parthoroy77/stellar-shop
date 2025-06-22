"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { TCategory } from "@repo/utils/types";

export const getAllCategories = async (query: string) => {
  const result = await serverFetcher<TCategory[]>(`/categories/?${query}`, { method: "GET" });
  return result?.data || [];
};
