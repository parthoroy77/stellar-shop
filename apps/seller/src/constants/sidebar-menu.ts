import { CiBoxList } from "react-icons/ci";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuSignal } from "react-icons/lu";
import { RiCustomerService2Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { VscFeedback, VscSymbolMethod } from "react-icons/vsc";
import { TSidebarItem } from "../types/sidebar.types";

export const menuItems: TSidebarItem[] = [
  {
    label: "Dashboard",
    Icon: RxDashboard,
    href: "/dashboard",
  },
  {
    label: "Products",
    Icon: VscSymbolMethod,
    children: [
      { label: "Manage Products", href: "/products" },
      { label: "Add New Product", href: "/products/add" },
      { label: "Inventory Management", href: "/products/inventory" },
    ],
  },
  {
    label: "Orders",
    Icon: CiBoxList,
    children: [{ label: "Manage Orders", href: "/orders" }],
  },
  {
    label: "Marketing & Promotions",
    Icon: LuSignal,
    children: [
      { label: "Marketing Dashboard", href: "/marketing/dashboard" },
      { label: "Email Campaigns", href: "/marketing/email-campaigns" },
      { label: "Promotions & Discounts", href: "/marketing/promotions" },
      { label: "Featured Products", href: "/marketing/featured-products" },
    ],
  },
  {
    label: "Shop Profile",
    Icon: IoStorefrontOutline,
    href: "/settings/profile",
  },
  {
    label: "Customer Support",
    Icon: RiCustomerService2Line,
    children: [
      { label: "Return & Refunds", href: "/support/returns" },
      { label: "Help Center", href: "/support/help-center" },
      { label: "Contact Support", href: "/support/contact" },
      { label: "Dispute Management", href: "/support/disputes" },
    ],
  },
  {
    label: "Feedback & Reviews",
    Icon: VscFeedback,
    children: [
      { label: "Manage Reviews", href: "/feedback/reviews" },
      { label: "Customer Feedback", href: "/feedback/customer-feedback" },
      { label: "Product Feedback", href: "/feedback/product-feedback" },
    ],
  },
];
