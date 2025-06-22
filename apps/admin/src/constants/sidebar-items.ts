import { TSidebarItem } from "@/types/sidebar.types";
import { CiBoxList } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { SiOpenproject } from "react-icons/si";
import { TbUserStar } from "react-icons/tb";
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
        href: "/attributes",
      },
      {
        label: "Shipping Options",
        href: "/shipping-options",
      },
      {
        label: "Tags",
        href: "/product-tags",
      },
    ],
  },
  {
    label: "Products",
    Icon: VscSymbolMethod,
    children: [
      {
        label: "Active Products",
        href: "/products/active",
      },
      {
        label: "Pending Products",
        href: "/products/pending",
      },
    ],
  },
  {
    label: "Orders",
    href: "/orders",
    Icon: CiBoxList,
  },
  {
    label: "Seller Management",
    Icon: TbUserStar,
    children: [
      {
        label: "Seller List",
        href: "/seller-management/",
      },
      {
        label: "Seller Approval",
        href: "/seller-management/seller-approval",
      },
      {
        label: "Add New Seller",
        href: "/item",
      },
    ],
  },
  {
    label: "Users",
    href: "/users",
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
