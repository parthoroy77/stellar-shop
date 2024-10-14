import { TSidebarItem } from "@/types/sidebar.types";
import { CiBoxList } from "react-icons/ci";
import { GoCircle, GoPeople } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { RiAlignItemLeftLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

export const sidebarItems: TSidebarItem[] = [
  {
    label: "Dashboard",
    href: "/",
    Icon: RxDashboard,
    children: [
      {
        label: "Child",
        href: "/item",
        Icon: GoCircle,
      },
      {
        label: "Child",
        href: "/item",
        Icon: GoCircle,
      },
      {
        label: "Child",
        href: "/item",
        Icon: GoCircle,
      },
    ],
  },
  {
    label: "Products",
    href: "/item",
    Icon: RiAlignItemLeftLine,
  },
  {
    label: "Orders",
    href: "/item",
    Icon: CiBoxList,
  },
  {
    label: "Users",
    href: "/item",
    Icon: GoPeople,
  },
  {
    label: "Settings",
    href: "/item",
    Icon: IoSettingsOutline,
  },
];
