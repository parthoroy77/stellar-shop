"use server";
import { fetcher } from "@/lib/fetcher";
import { TRefreshToken, TSession } from "@repo/utils/types";
import { loginSchema, registrationSchema, z } from "@repo/utils/validations";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const registerUser = async (data: z.infer<typeof registrationSchema>) => {
  return await fetcher("/auth/register", { method: "POST", body: data, cache: "no-store" });
};

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
  const result = await fetcher<{ session: TSession; refreshToken: TRefreshToken }>("/auth/login", {
    method: "POST",
    body: data,
    cache: "no-store",
  });
  if (result.data) {
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

      cookies().set("refresh_token", refreshToken.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(refreshToken.expiresAt),
      });
    }
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

export const refreshSession = async () => {
  const result = await fetcher<{ session: TSession; refreshToken: TRefreshToken }>("/auth/refresh-session", {
    method: "POST",
    cache: "no-store",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  if (!result.success) {
    redirect("/login");
  }

  if (result.data) {
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

      cookies().set("refresh_token", refreshToken.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(refreshToken.expiresAt),
      });
    }
  }
};
