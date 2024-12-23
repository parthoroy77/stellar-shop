import { TBrand } from "@repo/utils/types";
import { fetcher } from "../fetcher";

export const getAllBrands = async (query?: string) => {
  const result = await fetcher<TBrand[]>(`/brands?${query}`, { method: "GET" });
  return result?.data || [];
};
