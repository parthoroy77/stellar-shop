import { TLoginResponse } from "@repo/utils/types";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher } from "./fetcher";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email || credentials?.password) {
          return null;
        }

        const result = await fetcher<TLoginResponse>("/auth/login", {
          method: "POST",
          body: { email: credentials?.email, password: credentials?.password },
          cache: "no-store",
        });

        if (!result.success || !result.data) {
          return null;
        }

        const { session, refreshToken } = result.data;

        return {
          id: session.userId.toString(),
          sessionToken: session.sessionToken,
          refreshToken: refreshToken.token,
          sessionExpiresAt: new Date(session.expiresAt).getTime(),
          refreshExpiresAt: new Date(refreshToken.expiresAt).getTime(),
        };
      },
    }),
  ],
};
