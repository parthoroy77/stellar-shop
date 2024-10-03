"use server";
import { fetcher } from "@/lib/fetcher";
import { IUser, TRefreshToken, TSession } from "@repo/utils/types";
import { loginSchema, registrationSchema, z } from "@repo/utils/validations";
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

export const resendVerificationEmail = async (email: string) => {
  return await fetcher("/auth/resend-verification", { method: "POST", body: email });
};

export const refreshSessionAction = async () => {
  const cookieStore = cookies();
  const response = await fetch(process.env.API_URL + "/auth/refresh-session", {
    method: "POST",
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  console.log(response, "Refreshing session");
  const result = await response.json();
  if (!result.success) {
    // redirect("/login");
    // TODO: delete all cookies
  }

  // if (result.data) {
  //   const session = result.data.session;
  //   const refreshToken = result.data.refreshToken;
  //   if (session && refreshToken) {
  //     setCookies(session, refreshToken);
  //   }
  // }

  return {
    success: result.success,
  };
};

export const getUserAuth = async () => {
  const cookieStore = cookies();

  if (!cookieStore.get("session_token")) {
    return {
      user: null,
      session: null,
      isAuthenticated: false,
    };
  }
  const result = await fetcher<{ user: IUser; session: TSession }>("/auth/get-session", {
    headers: { Cookie: cookies().toString() },
    cache: "no-store",
  });

  if (!result.success && result.statusCode === 401) {
    if (!cookieStore.get("refresh_token")) {
      return {
        user: result.data?.user,
        session: result.data?.session,
        isAuthenticated: false,
      };
    }
    const refreshResult = await refreshSessionAction();
    if (refreshResult.success) {
      getUserAuth();
    }
  }

  if (!result.success) {
    return {
      user: null,
      session: null,
      isAuthenticated: false,
    };
  }
  console.log(result);
  return {
    user: result.data?.user,
    session: result.data?.session,
    isAuthenticated: true,
  };
};
