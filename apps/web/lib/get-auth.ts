"use server";
import { IUser, TSession } from "@repo/utils/types";
import { cookies } from "next/headers";
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
    cache: "no-store",
  });

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
