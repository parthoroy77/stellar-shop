"use server";

import { getServerAuth } from "@/lib/auth-utils";
import { fetcher } from "@/lib/fetcher";
import { revalidateTag } from "next/cache";

export const sellerOnboarding = async (data: FormData) => {
  const { session } = await getServerAuth();
  const result = await fetcher("/sellers/onboarding", {
    method: "POST",
    body: data,
    session,
  });

  if (result.success) {
    revalidateTag("onboarding-status");
  }

  return result;
};
