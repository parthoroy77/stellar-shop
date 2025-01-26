"use client";
import { profileMenus } from "@/constants/profile-menus";
import { Button } from "@ui/index";
import { cn } from "@ui/lib/utils";
import { usePathname } from "next/navigation";

const AccountSettingsTab = () => {
  const pathname = usePathname();
  return (
    <div className="flex h-10 w-full flex-nowrap items-center gap-3 overflow-y-scroll lg:hidden">
      {profileMenus.map((menu, i) => {
        const isActive = pathname === menu.href;
        return (
          <Button
            key={i}
            size={"sm"}
            variant={"ghost"}
            className={cn(
              "text-accent-foreground flex items-center justify-center gap-1 rounded-none border-b-2 px-1.5 py-1.5 font-medium",
              isActive && "border-b-primary text-black"
            )}
          >
            <menu.Icon size={17} />
            <span>{menu.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default AccountSettingsTab;
