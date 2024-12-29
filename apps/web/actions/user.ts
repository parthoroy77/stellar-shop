"use server";

import { getServerAuth } from "@/lib/auth-utils";
import { fetcher } from "@/lib/fetcher";
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
