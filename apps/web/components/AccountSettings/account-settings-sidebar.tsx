"use client";
import { profileMenus } from "@/constants/profile-menus";
import { cn } from "@ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountSettingsSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden h-full w-[20%] space-y-3 lg:block">
      <h2 className="text-xl font-bold">Account Settings</h2>
      <div className="space-y-3">
        {profileMenus.map((menu, idx) => (
          <Link href={menu.href} key={idx} className="block">
            <div
              className={cn(
                "text-accent-foreground flex items-center gap-2 rounded-md px-4 py-1.5 text-lg font-medium",
                pathname === menu.href && "bg-accent/30 border text-black"
              )}
            >
              <menu.Icon size={20} />
              <span>{menu.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default AccountSettingsSidebar;
