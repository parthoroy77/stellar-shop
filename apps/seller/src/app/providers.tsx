"use client";
import { QueryClient, TanstackProvider } from "@repo/tanstack-query";
import { SidebarProvider } from "@repo/ui";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import SellerWrapper from "./seller-wrapper";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider refetchInterval={300}>
      <TanstackProvider client={queryClient}>
        <SidebarProvider>
          <SellerWrapper>{children}</SellerWrapper>
        </SidebarProvider>
      </TanstackProvider>
    </SessionProvider>
  );
};

export default Providers;
