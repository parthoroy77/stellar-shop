"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { TShippingAddressValidation } from "@repo/utils/validations";
import { revalidateTag } from "next/cache";

export const addShippingAddress = async (data: TShippingAddressValidation) => {
  const result = await serverFetcher("/addresses/shippings", { method: "POST", body: data });
  if (result.success) {
    revalidateTag("shipping-options");
  }
  return result;
};

export const deleteShippingAddress = async (id: number) => {
  const result = await serverFetcher("/addresses/shippings/" + id, { method: "DELETE" });
  if (result.success) {
    revalidateTag("shipping-options");
  }
  return result;
};

export const updateShippingAddress = async (id: number, data: TShippingAddressValidation) => {
  const result = await serverFetcher("/addresses/shippings/" + id, { method: "PATCH", body: data });
  if (result.success) {
    revalidateTag("shipping-options");
  }
  return result;
};
