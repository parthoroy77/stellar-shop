"use server";

import { fetcher } from "@/lib/fetcher";
import { loginSchema, registrationSchema, z } from "@repo/utils/validations";
const baseUrl = process.env.API_URL;

export const registerUser = async (data: z.infer<typeof registrationSchema>) => {
  return await fetcher("/auth/register", { method: "POST", body: data });
};

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
  return await fetcher("/auth/login", { method: "POST", body: data });
};

export const resendVerificationEmail = async (email: string) => {
  return await fetcher("/auth/resend-verification");
};
