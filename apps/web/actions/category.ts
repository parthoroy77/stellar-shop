"use server";

import { fetcher } from "@/lib/fetcher";
import { TCategory } from "@repo/utils/types";

export const getAllCategories = async () => {
  const response = await fetcher<TCategory[]>("/categories/get-all-with-children", {
    method: "GET",
    next: { tags: ["categories"] },
  });
  return response.data || [];
};
