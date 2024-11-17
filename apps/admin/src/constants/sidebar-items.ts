import { TSidebarItem } from "@/types/sidebar.types";
import { CiBoxList } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { RiAlignItemLeftLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

export const sidebarItems: TSidebarItem[] = [
  {
    label: "Dashboard",
    href: "/",
    Icon: RxDashboard,
  },
  {
    label: "Catalogs",
    Icon: RiAlignItemLeftLine,
    children: [
      {
        label: "Category",
        href: "/categories",
      },
      {
        label: "Product List",
        href: "/products",
      },
      {
        label: "Add Product",
        href: "/add-product",
      },
    ],
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
