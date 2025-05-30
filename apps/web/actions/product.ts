"use server";

import { fetcher } from "@/lib/fetcher";
import { TProduct } from "@repo/utils/types";

export type TProductFilters = {
  q?: string;
  brands?: string;
  categories?: string;
  status?: string;
  limit?: string;
  page?: string;
  sortBy?: string;
  order?: string;
  min?: string;
  max?: string;
};

export const getProductDetailBySlug = async (slug: string) => {
  const result = await fetcher<TProduct>("/products/slug/" + slug, {
    next: { tags: ["product", slug], revalidate: 10 },
  });
  return result.data;
};

export const getNewlyArrivedProducts = async (query?: string) => {
  const result = await fetcher<TProduct[]>(`/products/new-arrivals?${query}`, {
    next: { revalidate: 300, tags: ["newly-arrived"] },
  });
  return { data: result.data, meta: result.meta };
};

export const getProductBySearch = async (payload: TProductFilters) => {
  const queryString = Object.entries(payload)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${encodeURIComponent(key === "q" ? "query" : key)}=${encodeURIComponent(value.toString())}`)
    .join("&");

  const result = await fetcher<TProduct[]>(`/products/search?${queryString}`, {
    next: { revalidate: 300, tags: ["product-search", payload.q as string] },
  });
  return { data: result.data, meta: result.meta };
};
