"use client";
import ContextProviders from "@/contexts/context-providers";
import { QueryClient, TanstackProvider } from "@repo/tanstack-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackProvider client={queryClient}>
      <SessionProvider refetchInterval={300}>
        <ContextProviders>{children}</ContextProviders>
      </SessionProvider>
    </TanstackProvider>
  );
};
