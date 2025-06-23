"use server";

import { fetcher } from "@/lib/fetcher";
import { TCategory } from "@repo/utils/types";

export const getAllCategories = async () => {
  const response = await fetcher<TCategory[]>("/categories/with-children", {
    method: "GET",
    next: { tags: ["categories"], revalidate: 60 },
  });
  return response.data || [];
};

export const getTrendingCategories = async () => {
  const result = await fetcher<TCategory[]>("/categories/trending", {
    method: "GET",
    next: { tags: ["categories"], revalidate: 5 ^ 60 },
  });
  return result.data || [];
};
