import { IUser, TRefreshToken, TSession } from "@repo/utils/types";
import { DefaultSession, NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher } from "./fetcher";

// Extend the built-in Session type
interface ExtendedSession extends Session {
  user: IUser & DefaultSession["user"];
  sessionToken: string;
}

// Extend the built-in JWT type
interface ExtendedJWT extends JWT {
  sessionToken: string;
  refreshToken: string;
  sessionExpiresAt: number;
  refreshExpiresAt: number;
  userId: number;
}

// Extend the built-in User type
interface ExtendedUser extends User {
  sessionToken: string;
  refreshToken: string;
  sessionExpiresAt: number;
  refreshExpiresAt: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const result = await fetcher<{ session: TSession; refreshToken: TRefreshToken }>("/auth/login", {
          method: "POST",
          body: { email: credentials.email, password: credentials.password },
          cache: "no-store",
        });
        if (!result.success) {
          throw new Error(JSON.stringify({ message: result.message, status: result.statusCode }));
        }

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
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  callbacks: {
    async jwt({ token, user }): Promise<ExtendedJWT> {
      if (user) {
        const extendedUser = user as ExtendedUser;
        return {
          ...token,
          sessionToken: extendedUser.sessionToken,
          refreshToken: extendedUser.refreshToken,
          sessionExpiresAt: extendedUser.sessionExpiresAt,
          refreshExpiresAt: extendedUser.refreshExpiresAt,
          userId: parseInt(extendedUser.id, 10),
        };
      }

      const jwtToken = token as ExtendedJWT;

      // Check if the session token has expired
      if (Date.now() > jwtToken.sessionExpiresAt) {
        // Check if the refresh token has expired
        if (Date.now() > jwtToken.refreshExpiresAt) {
          // Both tokens have expired, force sign out
          return { ...jwtToken, error: "RefreshTokenExpired" as const };
        }
        const response = await fetcher<{ session: TSession; refreshToken: TRefreshToken }>("/auth/refresh-session", {
          method: "POST",
          headers: {
            Cookie: `refresh_token=${jwtToken.refreshToken}`,
          },
        });
        console.log({ response });
        if (!response.success) {
          return { ...jwtToken, error: "RefreshTokenError" as const };
        }

        if (response.success && response.data) {
          return {
            ...jwtToken,
            sessionToken: response.data.session.sessionToken,
            refreshToken: response.data.refreshToken.token,
            sessionExpiresAt: new Date(response.data.session.expiresAt).getTime(),
            refreshExpiresAt: new Date(response.data.refreshToken.expiresAt).getTime(),
          };
        }
      }

      return jwtToken;
    },
    async session({ session, token }): Promise<Session> {
      const jwtToken = token as ExtendedJWT;

      // Fetch the latest user data
      const result = await fetcher<{ user: IUser }>("/auth/get-me", {
        headers: {
          Cookie: `session_token=${jwtToken.sessionToken}`,
        },
        next: {
          revalidate: 300,
        },
      });
      if (!result.success || !result.data) {
        throw new Error("Failed to fetch user data");
      }
      return {
        ...session,
        user: {
          ...result.data.user,
        },
        sessionToken: jwtToken.sessionToken,
        // TODO: add expires
        // expires: new Date(jwtToken.sessionExpiresAt * 1000).toString(),
      } as ExtendedSession;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
