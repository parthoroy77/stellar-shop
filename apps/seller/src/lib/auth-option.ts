import { TLoginResponse, TUser } from "@repo/utils/types";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher } from "./fetcher";

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
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const result = await fetcher<TLoginResponse>("/auth/seller-login", {
          method: "POST",
          cache: "no-store",
          body: { email: credentials.email, password: credentials.password },
        });

        if (!result.success) {
          throw new Error(JSON.stringify({ message: result.message, status: result.statusCode }));
        }

        if (!result.success || !result.data) return null;

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
      // user accessible when its first login.
      if (user) {
        return {
          ...token,
          sessionToken: user.sessionToken,
          refreshToken: user.refreshToken,
          sessionExpiresAt: user.sessionExpiresAt,
          refreshExpiresAt: user.refreshExpiresAt,
        };
      }

      // Check session is expired
      if (Date.now() > token.sessionExpiresAt) {
        // check refresh token is also expired
        if (Date.now() > token.refreshExpiresAt) {
          // refresh token expired throw error
          throw new ForceLogoutError("Refresh token expired!");
        }

        // refresh session by refresh token

        const result = await fetcher<TLoginResponse>("/auth/refresh-session", {
          method: "POST",
          headers: {
            Cookie: `refresh_token=${token.refreshToken}`,
          },
        });

        if (!result.success || !result.data) {
          throw new ForceLogoutError("Failed to refresh session");
        }

        const { session, refreshToken } = result.data;
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

    async session({ token, session }) {
      // fetch the auth user from backend
      const result = await fetcher<{ user: TUser }>("/auth/me", {
        cache: "force-cache",
        headers: {
          Cookie: `session_token=${token.sessionToken}`,
        },
        next: { revalidate: 300, tags: ["auth"] },
      });

      if (!result.success || !result.data) {
        throw new ForceLogoutError("Failed to fetch user data");
      }

      // attach user data in session
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
    // when user signout also hit backend to proper logout.
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
