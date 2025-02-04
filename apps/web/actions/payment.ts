"use server";
import { serverFetcher } from "@/lib/server-fetcher";
import { IPaymentMethod } from "@repo/utils/types";

export const getPaymentMethods = async () => {
  const result = await serverFetcher<IPaymentMethod[]>("/payment-methods");
  return result.data;
};
