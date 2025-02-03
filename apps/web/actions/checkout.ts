"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { TCheckoutInitiatePayload, TCheckoutSessionData } from "@repo/utils/types";
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

export const getUserCheckoutSession = async () => {
  const result = await serverFetcher<TCheckoutSessionData | null>("/checkout/session", {
    next: { revalidate: 60, tags: ["checkout-session"] },
  });
  return result.data;
};
