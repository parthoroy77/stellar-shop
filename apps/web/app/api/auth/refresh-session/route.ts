import { TRefreshToken, TSession } from "@repo/utils/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = await fetch(process.env.API_URL + "/auth/refresh-session", {
    method: "POST",
    cache: "no-store",
    credentials: "include",
    headers: {
      Cookie: cookies().toString(),
    },
  });

  const result = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: result.message, statusCode: response.status, success: result.success },
      { status: response.status }
    );
  }

  const { session, refreshToken }: { session: TSession; refreshToken: TRefreshToken } = result.data;

  if (session && refreshToken) {
    setCookies(session, refreshToken);
  }

  return NextResponse.json(
    { message: result.message, statusCode: response.status, success: result.success },
    { status: response.status }
  );
}
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
