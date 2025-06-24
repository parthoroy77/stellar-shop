"use server";

import { fetcher } from "@/lib/fetcher";
import { getProductQueryStr } from "@repo/utils/functions";
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
    next: { tags: ["product", slug], revalidate: 60 * 60 },
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
  const queryString = getProductQueryStr(payload);

  const result = await fetcher<TProduct[]>(`/products/search?${queryString}`, {
    next: { revalidate: 60 * 60, tags: ["product-search", payload.q as string] },
  });
  return { data: result.data, meta: result.meta };
};

export const getProductByCategory = async (slug: string, filters: TProductFilters) => {
  const queryString = getProductQueryStr(filters);

  const result = await fetcher<TProduct[]>(`/products/category/${slug}?${queryString}`, {
    next: { revalidate: 60 * 60, tags: ["product-category", slug as string] },
  });

  return { data: result.data, meta: result.meta };
};

export const getBestSellingProducts = async (limit: number, skip?: number) => {
  let query = `limit=${limit}`;

  if (skip) {
    query += `&skip=${skip}`;
  }

  const result = await fetcher<TProduct[]>(`/products/best-selling?${query}`, {
    next: { revalidate: 60 * 60, tags: ["best-selling", limit.toString()] },
  });

  return result.data || [];
};
