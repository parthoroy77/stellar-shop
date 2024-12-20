import { TCategory } from "@repo/utils/types";
import { fetcher } from "../fetcher";

export const getAllCategories = async (query: string) => {
  const result = await fetcher<TCategory[]>(`/categories/get-all?${query}`, { method: "GET" });
  return result?.data || [];
};
