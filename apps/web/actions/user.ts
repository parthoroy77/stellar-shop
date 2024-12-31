"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { TUserProfileValidation } from "@repo/utils/validations";
import { revalidateTag } from "next/cache";

export const updateUserProfile = async (data: TUserProfileValidation) => {
  const result = await serverFetcher("/users/update", { method: "PATCH", body: data });
  if (result.success) {
    revalidateTag("auth");
  }
  return result;
};

export const updateUserPhoto = async (data: FormData) => {
  const result = await serverFetcher("/users/me/avatar", { method: "PUT", body: data });
  if (result.success) {
    revalidateTag("auth");
  }
  return result;
};

export const deleteUserPhoto = async () => {
  const result = await serverFetcher("/users/me/avatar", { method: "DELETE" });
  if (result.success) {
    revalidateTag("auth");
  }
  return result;
};
