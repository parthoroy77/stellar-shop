"use server";

import { fetcher } from "@/lib/fetcher";
import { TRegistrationValidation } from "@repo/utils/validations";

export const registerUser = async (data: TRegistrationValidation) => {
  return await fetcher("/auth/register", { method: "POST", body: data, cache: "no-store" });
};
