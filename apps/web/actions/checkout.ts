"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { TCheckoutInitiatePayload, TCheckoutSessionData, TCheckoutUpdatePayload } from "@repo/utils/types";
import { revalidateTag } from "next/cache";
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
    revalidateTag("checkout-session");
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

export const updateUserCheckoutData = async (payload: TCheckoutUpdatePayload) => {
  const result = await serverFetcher("/checkout/update", { method: "PUT", body: payload });

  if (result.success && result.statusCode === 200) {
    revalidateTag("checkout-session");
  }

  result.success;
};
