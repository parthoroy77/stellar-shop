"use client";
import { useClientSession } from "@/lib/auth-utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@ui/index";
import { LuBell, LuChevronsUpDown, LuUser } from "react-icons/lu";
import LogoutButton from "../ui/logout-button";

const AppSidebarFooter = () => {
  const { isMobile } = useSidebar();
  const { session } = useClientSession();
  return (
    <SidebarFooter>
      <SidebarMenu className="rounded-md bg-white drop-shadow">
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="https://media.istockphoto.com/id/1014065698/photo/im-serious-about-success.jpg?s=612x612&w=0&k=20&c=ValIWlBiRlgncEje7UcSh-1sBxDSKuf41sKRn0e2GNg=" />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{session?.user.fullName}</span>
                  <span className="truncate text-xs">{session?.user.email}</span>
                </div>
                <LuChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="https://media.istockphoto.com/id/1014065698/photo/im-serious-about-success.jpg?s=612x612&w=0&k=20&c=ValIWlBiRlgncEje7UcSh-1sBxDSKuf41sKRn0e2GNg=" />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{session?.user.fullName}</span>
                    <span className="truncate text-xs">{session?.user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center gap-2">
                  <LuUser />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <LuBell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default AppSidebarFooter;
