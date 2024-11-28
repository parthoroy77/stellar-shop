"use client";
import { SidebarProvider } from "@repo/ui";
import { ReactNode } from "react";
const Providers = ({ children }: { children: ReactNode }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default Providers;
