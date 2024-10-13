import { TSidebarItem } from "@/types/sidebar.types";
import { FC, useState } from "react";
import { GoCircle } from "react-icons/go";
import { SlArrowRight } from "react-icons/sl";
import { NavLink } from "react-router-dom";

interface SidebarMenuProps {
  item: TSidebarItem;
}

const SidebarMenu: FC<SidebarMenuProps> = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <ul className="text-accent-foreground space-y-1 text-sm *:rounded-md *:px-4 *:py-2">
      <NavLink
        to={item.href}
        onClick={() => setOpen((prev) => !prev)}
        className={({ isActive }) =>
          `flex cursor-pointer items-center justify-between gap-3 duration-200 ${item.label === "Dashboard" ? "bg-accent/60 text-black" : "hover:bg-accent/50 hover:text-black"}`
        }
      >
        <div className="flex items-center gap-3">
          <item.Icon />
          <span>{item.label}</span>
        </div>
        {item.children && <SlArrowRight size={12} className={`duration-200 ${open ? "rotate-90" : "rotate-0"}`} />}
      </NavLink>
      {open && item.children && (
        <>
          {item.children.map((_y, i) => (
            <li
              key={i}
              className="hover:bg-accent/60 flex cursor-pointer items-center gap-3 !pl-9 duration-200 hover:text-black"
            >
              <GoCircle size={10} />
              <span>Child</span>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default SidebarMenu;
