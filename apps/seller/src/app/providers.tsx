"use client";
import { SidebarProvider } from "@repo/ui";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider refetchInterval={300}>
      <SidebarProvider>{children}</SidebarProvider>
    </SessionProvider>
  );
};

export default Providers;
