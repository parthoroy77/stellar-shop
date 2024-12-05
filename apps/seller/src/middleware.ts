import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { API_AUTH_PREFIX, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, LOGIN_ROUTE, PUBLIC_ROUTES } from "./routes";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  // Get token
  const token = await getToken({ req: req as Request as any });

  // Check if token payloads are valid
  const isValidToken = !!token?.sessionToken && token.refreshToken && new Date() < new Date(token.refreshExpiresAt);

  // Check if it's an API authentication route
  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);

  // Check if it's a public route
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  // Check if it's an auth route
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  // Allow API routes to pass through
  if (isApiAuthRoute) {
    return null;
  }

  // Allow public routes (only landing page in this case)
  if (isPublicRoute) {
    return null;
  }

  // Handle auth routes
  if (isAuthRoute) {
    // Redirect authenticated users away from auth routes
    if (isValidToken) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // Allow unauthenticated users to access auth routes
    return null;
  }

  // For all other routes (private routes)
  if (!isValidToken) {
    // Redirect unauthenticated users to login page
    const loginUrl = new URL(LOGIN_ROUTE, nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow authenticated users to access private routes
  return null;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
