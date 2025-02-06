"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const useAuthRedirect = (router: AppRouterInstance, pathname: string) => {
  const encodedPath = encodeURIComponent(pathname);
  // Redirect to login with the callback URL
  router.push(`/login?callbackUrl=${encodedPath}`);
};

export default useAuthRedirect;
