"use server";

import { fetcher } from "@/lib/fetcher";
import { TProduct } from "@repo/utils/types";

export const getProductDetailBySlug = async (slug: string) => {
  const result = await fetcher<TProduct>("/products/slug/" + slug, { next: { tags: ["product"] } });
  return result.data;
};
