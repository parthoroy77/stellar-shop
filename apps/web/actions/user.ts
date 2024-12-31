"use server";

import { getServerAuth } from "@/lib/auth-utils";
import { fetcher } from "@/lib/fetcher";
import { serverFetcher } from "@/lib/server-fetcher";
import { TUserProfileValidation } from "@repo/utils/validations";
import { revalidateTag } from "next/cache";

export const updateUserProfile = async (data: TUserProfileValidation) => {
  const { session } = await getServerAuth();
  const result = await fetcher("/users/update", { method: "PATCH", session, body: data });
  if (result.success) {
    revalidateTag("auth");
  }
  return result;
};

export const updateUserPhoto = async (data: FormData) => {
  const result = await serverFetcher("/users/api", { method: "PUT", body: data });
  if (result.success) {
    revalidateTag("auth");
  }
  return result;
};

export const deleteUserPhoto = async () => {
  const result = await serverFetcher("/users/api", { method: "DELETE" });
  if (result.success) {
    revalidateTag("auth");
  }
  return result;
};
