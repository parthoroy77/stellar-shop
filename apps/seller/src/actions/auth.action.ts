"use server";

import { fetcher } from "@/lib/fetcher";
import { TRegistrationValidation } from "@repo/utils/validations";

export const registerUser = async (data: TRegistrationValidation) => {
  return await fetcher("/auth/seller-registration", { method: "POST", body: data, cache: "no-store" });
};

export const resendVerificationEmail = async (email: string) => {
  return await fetcher("/auth/resend-verification", { method: "POST", body: { email } });
};

export const verifyAccount = async (token: string) => {
  const result = await fetcher("/auth/verify-account", {
    method: "POST",
    body: { token },
    cache: "no-cache",
  });
  return result;
};
