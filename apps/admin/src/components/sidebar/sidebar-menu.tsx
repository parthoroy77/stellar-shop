import { TSidebarItem } from "@/types/sidebar.types";
import { cn } from "@ui/lib/utils";
import { FC, memo, useCallback, useState } from "react";
import { GoCircle } from "react-icons/go";
import { SlArrowRight } from "react-icons/sl";
import { NavLink } from "react-router-dom";

interface SidebarMenuProps {
  item: TSidebarItem;
  expanded: boolean;
  level?: number;
}

const SidebarMenu: FC<SidebarMenuProps> = memo(({ item, expanded, level = 0 }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if there are children
    setOpen((prev) => !prev);
  }, []);

  const paddingLeft = level === 1 ? "pl-9" : level === 2 ? "pl-12" : "";

  return (
    <div className="space-y-2">
      <NavLink
        to={!item.children ? (item.href ? item.href : "") : ""}
        onClick={item.children ? toggleOpen : undefined}
        className={({ isActive }) =>
          cn(
            "hover:bg-accent/30 flex w-full items-center gap-2 rounded-md border py-2 text-sm duration-300",
            expanded ? "justify-between px-5" : "justify-center",
            isActive && !item.children ? "bg-accent/60 hover:bg-accent/70" : "bg-transparent",
            paddingLeft
          )
        }
      >
        <div className="flex items-center gap-2">
          {item.Icon ? <item.Icon size={!expanded ? 20 : 18} /> : <GoCircle size={10} />}
          {expanded && <span>{item.label}</span>}
        </div>
        {expanded && item.children && (
          <SlArrowRight size={12} className={cn("rotate-0 duration-300", open && "rotate-90")} />
        )}
      </NavLink>

      {expanded &&
        open &&
        item.children &&
        item.children.map((subElem, i) => (
          <SidebarMenu key={i} item={subElem} level={item.children ? level + 1 : level} expanded={expanded} />
        ))}
    </div>
  );
});

export default SidebarMenu;
