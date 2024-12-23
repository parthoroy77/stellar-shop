"use server";
import { getServerAuth } from "@/lib/auth-utils";
import { fetcher } from "@/lib/fetcher";
import { TBrand } from "@repo/utils/types";

export const createBrand = async (data: FormData) => {
  const { session } = await getServerAuth();
  const result = await fetcher<TBrand>("/brands", { method: "POST", cache: "no-cache", body: data, session });
  return result;
};
