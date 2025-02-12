"use server";

import { fetcher } from "@/lib/fetcher";
import { TProduct } from "@repo/utils/types";

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
