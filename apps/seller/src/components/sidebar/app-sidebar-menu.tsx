"use client";
import { menuItems } from "@/constants/sidebar-menu";
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
} from "@repo/ui";
import { cn } from "@ui/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiChevronRight } from "react-icons/bi";

const AppSidebarMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <SidebarGroup className="space-y-2">
      {menuItems.map((menu, i) => {
        const isActive = pathname === menu.href;
        const isChildrenActive = menu.children && menu.children.some((x) => x.href === pathname);
        return (
          <Collapsible key={i} asChild className="group/collapsible list-none">
            <SidebarMenuItem>
              <CollapsibleTrigger
                asChild
                className="text-accent-foreground h-[35px] text-nowrap pl-2.5 text-sm font-medium duration-300 hover:bg-white"
              >
                {menu.href ? (
                  <SidebarMenuButton
                    onClick={() => router.push(menu.href!)}
                    tooltip={menu.label}
                    className={cn(isActive && "bg-white text-black drop-shadow")}
                  >
                    {menu.Icon && <menu.Icon className="block" size={17} />}
                    <span>{menu.label}</span>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton
                    tooltip={menu.label}
                    className={cn(isChildrenActive && "bg-white text-black drop-shadow")}
                  >
                    {menu.Icon && <menu.Icon size={17} className="block" />}
                    <span>{menu.label}</span>
                    {menu.children?.length && (
                      <BiChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                )}
              </CollapsibleTrigger>
              {menu?.children?.length && (
                <CollapsibleContent>
                  <SidebarMenuSub className="border-sidebar-ring border-l-2 pl-3 pr-0">
                    {menu?.children?.map((subItem, i) => {
                      const subActive = pathname === subItem.href;
                      return (
                        <SidebarMenuSubItem key={i} className="p-0">
                          <SidebarMenuSubButton
                            asChild
                            className={cn(
                              "px-4 duration-300",
                              subActive && "border-l-secondary bg-blue-100 text-blue-700 drop-shadow"
                            )}
                          >
                            <Link href={subItem.href || "/"}>
                              <span>{subItem.label}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        );
      })}
    </SidebarGroup>
  );
};

export default AppSidebarMenu;
