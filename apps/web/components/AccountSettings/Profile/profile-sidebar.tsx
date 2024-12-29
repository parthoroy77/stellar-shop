"use client";
import { cn } from "@ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { MdOutlineManageHistory } from "react-icons/md";
import { RiUserLocationLine, RiUserSettingsLine } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";

const profileMenus = [
  {
    label: "Profile",
    Icon: RiUserSettingsLine,
    href: "/profile",
  },
  {
    label: "Manage Address",
    Icon: RiUserLocationLine,
    href: "/profile#manage-address",
  },
  {
    label: "Manage Order",
    Icon: MdOutlineManageHistory,
    href: "/",
  },
  {
    label: "My Purchases",
    Icon: BiPurchaseTagAlt,
    href: "/",
  },
  {
    label: "My Reviews",
    Icon: VscFeedback,
    href: "/",
  },
  {
    label: "Refund & Return",
    Icon: HiOutlineReceiptRefund,
    href: "/",
  },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="h-full w-[20%] space-y-3">
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

export default ProfileSidebar;
