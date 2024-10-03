"use server";
import { IUser, TSession } from "@repo/utils/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetcher } from "./fetcher";

type TGetAuthResponse = {
  user: null | IUser;
  session: null | TSession;
  isAuthenticated: boolean;
};

export const getAuth = async (): Promise<TGetAuthResponse> => {
  const result = await fetcher<{ session: TSession; user: IUser }>("/auth/get-session", {
    headers: {
      Cookie: cookies().toString(),
    },
  });
  if (!result.success && result.statusCode === 401) {
    const response = await fetch("http://localhost:3000/api/auth/refresh-session", {
      method: "POST",
      cache: "no-store",
    });
    if (!response.ok) {
      redirect("/login");
    }
  }

  if (!result.success && result.statusCode !== 200) {
    return {
      user: null,
      session: null,
      isAuthenticated: false,
    };
  }

  return {
    user: result.data?.user!,
    session: result.data?.session!,
    isAuthenticated: true,
  };
};
