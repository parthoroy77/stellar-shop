import { IconType } from "react-icons";

export type TSidebarItem = {
  label: string;
  href?: string;
  Icon: IconType;
  children?: TSidebarItem[];
};
