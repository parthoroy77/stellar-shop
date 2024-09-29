"use server";

import { fetcher } from "@/lib/fetcher";
import { loginSchema, registrationSchema, z } from "@repo/utils/validations";
import { cookies } from "next/headers";

export const registerUser = async (data: z.infer<typeof registrationSchema>) => {
  return await fetcher("/auth/register", { method: "POST", body: data, cache: "no-store", next: { revalidate: 0 } });
};

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
  const result: any = await fetcher("/auth/login", {
    method: "POST",
    body: data,
    cache: "no-store",
    next: { revalidate: 0 },
  });
  const session = result.data.session;
  const refreshToken = result.data.refreshToken;
  if (session && refreshToken) {
    cookies().set("session_token", session.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(session.expiresAt),
    });

    cookies().set("refresh_token", session.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(refreshToken.expiresAt),
    });
  }
  return {
    message: result.message,
    statusCode: result.statusCode,
    success: result.success,
  };
};

export const resendVerificationEmail = async (email: string) => {
  return await fetcher("/auth/resend-verification", { method: "POST", body: email });
};
