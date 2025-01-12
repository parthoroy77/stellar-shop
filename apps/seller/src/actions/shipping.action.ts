"use server";
import { serverFetcher } from "@/lib/server-fetcher";
import { IShippingOption } from "@repo/utils/types";

export const getAllShippingOptions = async () => {
  const result = await serverFetcher<IShippingOption[]>("/shippings/");
  return result.data || [];
};
