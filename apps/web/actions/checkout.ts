"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { TCheckoutInitiatePayload } from "@repo/utils/types";
import { redirect } from "next/navigation";

export const initiateCheckout = async (payload: TCheckoutInitiatePayload, type: "cart" | "product") => {
  const result = await serverFetcher("/checkout/initiate", {
    method: "POST",
    body: {
      type,
      ...payload,
    },
  });

  if (result.success) {
    redirect("/checkout");
  }

  return result;
};
