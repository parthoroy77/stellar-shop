"use server";
import { getServerAuth } from "@/lib/auth-utils";
import { fetcher } from "@/lib/fetcher";
import { TRefreshToken, TSession } from "@repo/utils/types";
import { loginSchema, registrationSchema, z } from "@repo/utils/validations";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const setCookies = (session: TSession, refreshToken: TRefreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
  };

  cookies().set("session_token", session.sessionToken, {
    ...cookieOptions,
    expires: new Date(session.expiresAt),
  });

  cookies().set("refresh_token", refreshToken.token, {
    ...cookieOptions,
    expires: new Date(refreshToken.expiresAt),
  });
};

export const registerUser = async (data: z.infer<typeof registrationSchema>) => {
  return await fetcher("/auth/register", { method: "POST", body: data, cache: "no-store" });
};
// not required as switched to next auth
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
      setCookies(session, refreshToken);
    }
  }

  return {
    message: result.message,
    statusCode: result.statusCode,
    success: result.success,
  };
};

// logout user
export const logoutUser = async () => {
  const { session } = await getServerAuth();
  if (!session?.sessionToken) {
    return {
      success: false,
      message: "No active session found!",
      statusCode: 401,
      data: {},
    };
  }

  const result = await fetcher("/auth/logout", {
    method: "POST",
    headers: {
      Cookie: `session_token=${session.sessionToken}`,
    },
  });

  if (result.success) {
    revalidateTag("auth");
  }

  return result;
};

export const resendVerificationEmail = async (email: string) => {
  return await fetcher("/auth/resend-verification", { method: "POST", body: email });
};
