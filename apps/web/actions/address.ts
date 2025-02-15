"use server";
import { serverFetcher } from "@/lib/server-fetcher";
import { IShippingAddress } from "@repo/utils/types";
import { TShippingAddressValidation } from "@repo/utils/validations";
import { revalidateTag } from "next/cache";

export const addShippingAddress = async (data: TShippingAddressValidation) => {
  const result = await serverFetcher("/addresses/shippings", { method: "POST", body: data });
  if (result.success) {
    revalidateTag("shipping-addresses");
  }
  return result;
};

export const deleteShippingAddress = async (id: number) => {
  const result = await serverFetcher("/addresses/shippings/" + id, { method: "DELETE" });
  if (result.success) {
    revalidateTag("shipping-addresses");
  }
  return result;
};

export const updateShippingAddress = async (id: number, data: TShippingAddressValidation) => {
  const result = await serverFetcher("/addresses/shippings/" + id, { method: "PATCH", body: data });
  if (result.success) {
    revalidateTag("shipping-addresses");
  }
  return result;
};

export const getAllShippingAddresses = async () => {
  const result = await serverFetcher<IShippingAddress[]>("/addresses/shippings", {
    next: { tags: ["shipping-addresses"], revalidate: 200 },
  });
  return result.data || [];
};
