import { TSidebarItem } from "@/types/sidebar.types";
import { AiOutlineProduct } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";

export const sidebarItems: TSidebarItem[] = [
  {
    label: "Dashboard",
    href: "/",
    Icon: RxDashboard,
    children: [
      {
        label: "Child",
        href: "/",
        Icon: RxDashboard,
      },
      {
        label: "Child",
        href: "/",
        Icon: RxDashboard,
      },
      {
        label: "Child",
        href: "/",
        Icon: RxDashboard,
      },
    ],
  },
  {
    label: "Products",
    href: "/",
    Icon: AiOutlineProduct,
    children: [
      {
        label: "Child",
        href: "/",
        Icon: RxDashboard,
      },
      {
        label: "Child",
        href: "/",
        Icon: RxDashboard,
      },
      {
        label: "Child",
        href: "/",
        Icon: RxDashboard,
      },
    ],
  },
  {
    label: "Orders",
    href: "/",
    Icon: RxDashboard,
    children: [
      {
        label: "Child",
        href: "/",
        Icon: RxDashboard,
      },
      {
        label: "Child",
        href: "/",
        Icon: RxDashboard,
      },
      {
        label: "Child",
        href: "/",
        Icon: RxDashboard,
      },
    ],
  },
  {
    label: "Users",
    href: "/",
    Icon: RxDashboard,
    children: [
      {
        label: "Child",
        href: "/",
        Icon: RxDashboard,
      },
      {
        label: "Child",
        href: "/",
        Icon: RxDashboard,
      },
      {
        label: "Child",
        href: "/",
        Icon: RxDashboard,
      },
    ],
  },
  {
    label: "Settings",
    href: "/",
    Icon: RxDashboard,
  },
];
