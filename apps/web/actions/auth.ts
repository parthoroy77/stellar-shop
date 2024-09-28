"use server";

import { fetcher } from "@/lib/fetcher";
import { loginSchema, registrationSchema, z } from "@repo/utils/validations";
import { cookies } from "next/headers";

export const registerUser = async (data: z.infer<typeof registrationSchema>) => {
  return await fetcher("/auth/register", { method: "POST", body: data, cache: "no-store" });
};

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
  const result: any = await fetcher("/auth/login", { method: "POST", body: data, cache: "no-store" });
  const session = result.data;
  if (session) {
    const expiresDate = new Date(session.expiresAt);
    cookies().set("session_token", session.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: expiresDate,
    });
  }
  return result;
};

export const resendVerificationEmail = async (email: string) => {
  return await fetcher("/auth/resend-verification");
};
