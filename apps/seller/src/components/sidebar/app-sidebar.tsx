import { Sidebar, SidebarContent, SidebarHeader, SidebarSeparator } from "@repo/ui";
import AppSidebarFooter from "./app-sidebar-footer";
import AppSidebarMenu from "./app-sidebar-menu";
import LogoText from "./logo-text";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="hover:bg-accent/40 cursor-pointer rounded-md duration-300">
        <LogoText />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="custom-scrollbar">
        <AppSidebarMenu />
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  );
}
