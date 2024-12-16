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
      { label: "Manage Products", href: "/products/manage" },
      { label: "Add New Product", href: "/products/add" },
      { label: "Product Categories", href: "/products/categories" },
      { label: "Inventory Management", href: "/products/inventory" },
      { label: "Bulk Import/Export", href: "/products/import-export" },
      { label: "Product Reviews", href: "/products/reviews" },
    ],
  },
  {
    label: "Orders",
    Icon: CiBoxList,
    children: [
      { label: "View Orders", href: "/orders" },
      { label: "Order History", href: "/orders/history" },
      { label: "Order Status", href: "/orders/status" },
      { label: "Refund Requests", href: "/orders/refunds" },
      { label: "Shipping & Delivery", href: "/orders/shipping" },
    ],
  },
  {
    label: "Marketing & Promotions",
    Icon: LuSignal,
    children: [
      { label: "Marketing Dashboard", href: "/marketing/dashboard" },
      { label: "Email Campaigns", href: "/marketing/email-campaigns" },
      { label: "Promotions & Discounts", href: "/marketing/promotions" },
      { label: "Advertising Tools", href: "/marketing/ads" },
      { label: "Featured Products", href: "/marketing/featured-products" },
    ],
  },
  {
    label: "Store Settings",
    Icon: IoStorefrontOutline,
    children: [
      { label: "Store Profile", href: "/settings/profile" },
      { label: "Store Branding", href: "/settings/branding" },
      { label: "Payment Settings", href: "/settings/payment" },
      { label: "Shipping Settings", href: "/settings/shipping" },
      { label: "Tax Settings", href: "/settings/tax" },
      { label: "Notifications Settings", href: "/settings/notifications" },
    ],
  },
  {
    label: "Customer Support",
    Icon: RiCustomerService2Line,
    children: [
      { label: "Help Center", href: "/support/help-center" },
      { label: "Contact Support", href: "/support/contact" },
      { label: "Dispute Management", href: "/support/disputes" },
      { label: "Return & Refunds", href: "/support/returns" },
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
