"use server";

import { fetcher } from "@/lib/fetcher";
import { TBrand } from "@repo/utils/types";

export const getAllBrands = async () => {
  const result = await fetcher<TBrand[]>("/brands/", { next: { revalidate: 5 * 60, tags: ["brands"] } });

  return result.data;
};
