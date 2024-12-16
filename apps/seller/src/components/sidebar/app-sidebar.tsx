import { Sidebar, SidebarContent, SidebarSeparator } from "@repo/ui";
import AppSidebarFooter from "./app-sidebar-footer";
import AppSidebarHeader from "./app-sidebar-header";
import AppSidebarMenu from "./app-sidebar-menu";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-none">
      <AppSidebarHeader />
      <SidebarSeparator />
      <SidebarContent className="custom-scrollbar">
        <AppSidebarMenu />
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  );
}
