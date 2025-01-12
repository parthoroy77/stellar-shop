"use server";
import { serverFetcher } from "@/lib/server-fetcher";
import { TBrand } from "@repo/utils/types";

export const createBrand = async (data: FormData) => {
  const result = await serverFetcher<TBrand>("/brands", { method: "POST", cache: "no-cache", body: data });
  return result;
};

export const getAllBrands = async (query?: string) => {
  const result = await serverFetcher<TBrand[]>(`/brands?${query}`, { method: "GET" });
  return result?.data || [];
};
