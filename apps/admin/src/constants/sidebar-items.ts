import { TSidebarItem } from "@/types/sidebar.types";
import { CiBoxList } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { SiOpenproject } from "react-icons/si";
import { VscSymbolMethod } from "react-icons/vsc";

export const sidebarItems: TSidebarItem[] = [
  {
    label: "Dashboard",
    href: "/",
    Icon: RxDashboard,
  },
  {
    label: "Catalogs",
    Icon: SiOpenproject,
    children: [
      {
        label: "Categories",
        href: "/categories",
      },
      {
        label: "Attributes",
        href: "/products",
      },
    ],
  },
  {
    label: "Products",
    Icon: VscSymbolMethod,
    children: [
      {
        label: "List",
        href: "/item",
      },
      {
        label: "Add",
        href: "/item",
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
/**
 * Dashboard
 * Catalogs
 *  - Categories
 *  - Attributes
 * Categories
 * Products
 *  - Add New Product
 *  - Products List
 *  - Products Request
 * Inventory Management
 *  - Update Inventory
 *  - Check inventories
 *  -
 * Orders
 *  - Manage Orders
 * Invoices
 *  -
 * Users
 * Settings
 */
