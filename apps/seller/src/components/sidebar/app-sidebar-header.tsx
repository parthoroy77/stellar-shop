"use client";
import { SidebarHeader, useSidebar } from "@ui/index";
import { cn } from "@ui/lib/utils";
import { LuPanelLeft } from "react-icons/lu";
import LogoText from "./logo-text";

const AppSidebarHeader = () => {
  const { toggleSidebar, open } = useSidebar();
  return (
    <SidebarHeader className="hover:bg-accent/40 flex cursor-pointer flex-row items-center justify-between rounded-md duration-300">
      <LogoText />
      <button className={cn(open ? "block" : "hidden")} onClick={toggleSidebar}>
        <LuPanelLeft />
      </button>
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
