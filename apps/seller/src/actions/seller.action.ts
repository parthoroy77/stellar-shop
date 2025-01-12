"use server";

import { getServerAuth } from "@/lib/auth-utils";
import { fetcher } from "@/lib/fetcher";
import { serverFetcher } from "@/lib/server-fetcher";
import { TSeller } from "@repo/utils/types";
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

export const getSellerProfile = async () => {
  const result = await serverFetcher<TSeller>("/sellers/", {
    next: {
      revalidate: 200,
      tags: ["seller"],
    },
  });
  return result.data;
};
