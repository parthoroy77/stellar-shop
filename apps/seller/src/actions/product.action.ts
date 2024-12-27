"use server";

import { getServerAuth } from "@/lib/auth-utils";
import { fetcher } from "@/lib/fetcher";

export const uploadProduct = async (data: FormData) => {
  const { session } = await getServerAuth();
  const result = await fetcher("/products", { method: "POST", body: data, session });
  return result;
};
