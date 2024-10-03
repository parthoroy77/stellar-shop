"use client";

import { getUserAuth } from "@/actions/auth";
import { IUser, TSession } from "@repo/utils/types";
import { useEffect, useState } from "react";

type TUseAuthReturn = {
  user: IUser | null;
  session: TSession | null;
  isAuthenticated: boolean;
};

export function useAuth() {
  const [authState, setAuthState] = useState<TUseAuthReturn | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const result = await getUserAuth();
        setAuthState({
          isAuthenticated: result.isAuthenticated,
          user: result.user!,
          session: result.session!,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          session: null,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return {
    ...authState,
    loading,
  };
}
