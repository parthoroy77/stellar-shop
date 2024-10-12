import { TSidebarItem } from "@/types/sidebar.types";

export const sidebarItems: TSidebarItem[] = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Products",
    href: "/",
    children: [
      {
        label: "Child",
        href: "/",
      },
      {
        label: "Child",
        href: "/",
      },
      {
        label: "Child",
        href: "/",
      },
    ],
  },
  {
    label: "Orders",
    href: "/",
    children: [
      {
        label: "Child",
        href: "/",
      },
      {
        label: "Child",
        href: "/",
      },
      {
        label: "Child",
        href: "/",
      },
    ],
  },
  {
    label: "Users",
    href: "/",
    children: [
      {
        label: "Child",
        href: "/",
      },
      {
        label: "Child",
        href: "/",
      },
      {
        label: "Child",
        href: "/",
      },
    ],
  },
  {
    label: "Settings",
    href: "/",
  },
];
