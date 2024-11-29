import { menuItems } from "@/src/constants/sidebar-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@ui/index";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

const AppSidebarMenu = () => {
  return (
    <SidebarGroup className="space-y-2">
      {menuItems.map((menu, i) => (
        <Collapsible key={i} asChild className="group/collapsible list-none">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild className="min-h-9 text-nowrap border px-4">
              {menu.href ? (
                <Link href={menu.href || ""}>
                  <SidebarMenuButton tooltip={menu.label}>
                    {menu.Icon && <menu.Icon />}
                    <span>{menu.label}</span>
                    {menu.children?.length && (
                      <BiChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </Link>
              ) : (
                <SidebarMenuButton tooltip={menu.label}>
                  {menu.Icon && <menu.Icon />}
                  <span>{menu.label}</span>
                  {menu.children?.length && (
                    <BiChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              )}
            </CollapsibleTrigger>
            {menu?.children?.length && (
              <CollapsibleContent>
                <SidebarMenuSub>
                  {menu?.children?.map((subItem, i) => (
                    <SidebarMenuSubItem key={i}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.href || "/"}>
                          <span>{subItem.label}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            )}
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarGroup>
  );
};

export default AppSidebarMenu;
