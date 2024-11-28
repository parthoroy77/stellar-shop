import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@repo/ui";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <h1>Stellar Shop | Seller</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
