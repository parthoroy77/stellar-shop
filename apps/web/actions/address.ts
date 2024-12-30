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
