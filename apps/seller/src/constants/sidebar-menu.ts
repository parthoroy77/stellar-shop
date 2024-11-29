import { RxDashboard } from "react-icons/rx";
import { TSidebarItem } from "../types/sidebar.types";

export const menuItems: TSidebarItem[] = [
  {
    label: "Dashboard",
    Icon: RxDashboard,
    children: [
      { label: "Overview", href: "/dashboard/overview" },
      { label: "Sales Performance", href: "/dashboard/sales" },
      { label: "Revenue Statistics", href: "/dashboard/revenue" },
      { label: "Notifications", href: "/dashboard/notifications" },
    ],
  },
  {
    label: "Products",
    Icon: RxDashboard,
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
    Icon: RxDashboard,
    children: [
      { label: "View Orders", href: "/orders" },
      { label: "Order History", href: "/orders/history" },
      { label: "Order Status", href: "/orders/status" },
      { label: "Refund Requests", href: "/orders/refunds" },
      { label: "Shipping & Delivery", href: "/orders/shipping" },
    ],
  },
  {
    label: "Subscriptions & Payments",
    Icon: RxDashboard,
    children: [
      { label: "Subscription Plans", href: "/subscriptions/plans" },
      { label: "Payment Methods", href: "/subscriptions/payment-methods" },
      { label: "Invoices", href: "/subscriptions/invoices" },
      { label: "Subscription Renewals", href: "/subscriptions/renewals" },
      { label: "Payment History", href: "/subscriptions/payment-history" },
    ],
  },
  {
    label: "Marketing & Promotions",
    Icon: RxDashboard,
    children: [
      { label: "Marketing Dashboard", href: "/marketing/dashboard" },
      { label: "Email Campaigns", href: "/marketing/email-campaigns" },
      { label: "Promotions & Discounts", href: "/marketing/promotions" },
      { label: "Advertising Tools", href: "/marketing/ads" },
      { label: "Featured Products", href: "/marketing/featured-products" },
    ],
  },
  {
    label: "Analytics & Reports",
    Icon: RxDashboard,
    children: [
      { label: "Sales Analytics", href: "/analytics/sales" },
      { label: "Traffic & Conversion", href: "/analytics/traffic" },
      { label: "Product Performance", href: "/analytics/product-performance" },
      { label: "Customer Insights", href: "/analytics/customer-insights" },
      { label: "Custom Reports", href: "/analytics/reports" },
    ],
  },
  {
    label: "Store Settings",
    Icon: RxDashboard,
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
    Icon: RxDashboard,
    children: [
      { label: "Help Center", href: "/support/help-center" },
      { label: "Contact Support", href: "/support/contact" },
      { label: "Dispute Management", href: "/support/disputes" },
      { label: "Return & Refunds", href: "/support/returns" },
    ],
  },
  {
    label: "Feedback & Reviews",
    Icon: RxDashboard,
    children: [
      { label: "Manage Reviews", href: "/feedback/reviews" },
      { label: "Customer Feedback", href: "/feedback/customer-feedback" },
      { label: "Product Feedback", href: "/feedback/product-feedback" },
    ],
  },
  {
    label: "Account Settings",
    Icon: RxDashboard,
    children: [
      { label: "Profile Settings", href: "/account/settings" },
      { label: "Change Password", href: "/account/change-password" },
      { label: "Notifications Settings", href: "/account/notifications" },
      { label: "Privacy Settings", href: "/account/privacy" },
      { label: "Deactivate Account", href: "/account/deactivate" },
    ],
  },
];
