import { TRefreshToken, TSession, TUser } from "@repo/utils/types";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher } from "./fetcher";

// Step 1: Create a custom error for force logout
class ForceLogoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForceLogoutError";
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const result = await fetcher<{ session: TSession; refreshToken: TRefreshToken }>("/auth/login", {
          method: "POST",
          body: { email: credentials.email, password: credentials.password },
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
  session: {
    strategy: "jwt",
    maxAge: 604800, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          sessionToken: user.sessionToken,
          refreshToken: user.refreshToken,
          sessionExpiresAt: user.sessionExpiresAt,
          refreshExpiresAt: user.refreshExpiresAt,
          userId: parseInt(user.id, 10),
        };
      }

      // Step 2: Check if the session token has expired
      if (Date.now() > token.sessionExpiresAt) {
        // Step 3: Check if the refresh token has expired
        if (Date.now() > token.refreshExpiresAt) {
          throw new ForceLogoutError("Refresh token expired");
        }

        const response = await fetcher<{ session: TSession; refreshToken: TRefreshToken }>("/auth/refresh-session", {
          method: "POST",
          headers: {
            Cookie: `refresh_token=${token.refreshToken}`,
          },
        });

        if (!response.success || !response.data) {
          throw new ForceLogoutError("Failed to refresh session");
        }

        const { session, refreshToken } = response.data;
        return {
          ...token,
          sessionToken: session.sessionToken,
          refreshToken: refreshToken.token,
          sessionExpiresAt: new Date(session.expiresAt).getTime(),
          refreshExpiresAt: new Date(refreshToken.expiresAt).getTime(),
        };
      }

      return token;
    },
    async session({ session, token }) {
      // Step 4: Fetch the latest user data
      const result = await fetcher<{ user: TUser }>("/auth/get-me", {
        headers: {
          Cookie: `session_token=${token.sessionToken}`,
        },
        next: {
          revalidate: 300,
          tags: ["auth"],
        },
      });

      if (!result.success || !result.data) {
        throw new ForceLogoutError("Failed to fetch user data");
      }

      return {
        ...session,
        user: result.data.user,
        sessionToken: token.sessionToken,
        expires: new Date(token.sessionExpiresAt).toISOString(),
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    // Step 5: Handle force logout
    async signOut({ token }) {
      if (token) {
        await fetcher("/auth/logout", {
          method: "POST",
          headers: {
            Cookie: `session_token=${token.sessionToken}`,
          },
        });
      }
    },
  },
};
