"use client";
import ContextProviders from "@/contexts/context-providers";
import { QueryClient, TanstackProvider } from "@repo/tanstack-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider refetchInterval={300}>
      <TanstackProvider client={queryClient}>
        <ContextProviders>{children}</ContextProviders>
      </TanstackProvider>
    </SessionProvider>
  );
};
