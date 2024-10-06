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
  const result = await fetcher<{ session: TSession; refreshToken: TRefreshToken }>("/auth/refresh-session", {
    method: "POST",
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!result.success) {
    // redirect("/login");
    // TODO: delete all cookies
  }

  if (result.data) {
    const session = result.data.session;
    const refreshToken = result.data.refreshToken;
    if (session && refreshToken) {
      setCookies(session, refreshToken);
    }
  }

  return {
    success: result.success,
  };
};

export const refreshSession = async () => {
  const response = await fetch(process.env.DOMAIN_URL + "/api/auth/refresh-session", {
    method: "POST",
    cache: "no-store",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  console.log(response, "from action");
  if (!response.ok) {
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
};

export const getUserAuth = async () => {
  const cookieStore = cookies();

  // maybe this check not required
  if (!cookieStore.get("session_token") && !cookieStore.get("refresh_token")) {
    return {
      user: null,
      session: null,
      isAuthenticated: false,
    };
  }

  // fetch user auth
  const result = await fetcher<{ user: IUser; session: TSession }>("/auth/get-session", {
    headers: { Cookie: cookies().toString() },
    cache: "no-store",
  });

  // if user auth is invalid then and has refresh token try to refresh session
  if (!result.success && result.statusCode === 401) {
    if (!cookieStore.get("refresh_token")) {
      return {
        user: result.data?.user,
        session: result.data?.session,
        isAuthenticated: false,
      };
    }
    const refreshResult = await refreshSession();
    // after successful refresh get updated auth
    // if (refreshResult.success) {
    //   getUserAuth();
    // }
  }

  // if get auth failed return
  if (!result.success) {
    return {
      user: null,
      session: null,
      isAuthenticated: false,
    };
  }

  // return auth data
  return {
    user: result.data?.user,
    session: result.data?.session,
    isAuthenticated: true,
  };
};
