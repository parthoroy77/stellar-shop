import { TSidebarItem } from "@/types/sidebar.types";
import { cn } from "@ui/lib/utils";
import { FC, memo, useCallback, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { NavLink } from "react-router-dom";

interface SidebarMenuProps {
  item: TSidebarItem;
  expanded: boolean;
  subItem?: boolean;
}

const SidebarMenu: FC<SidebarMenuProps> = memo(({ item, expanded, subItem = false }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className="space-y-2">
      <NavLink
        to={item.href}
        onClick={item.children ? toggleOpen : undefined}
        className={({ isActive }) =>
          cn(
            "hover:bg-accent/30 flex w-full items-center gap-2 rounded-md border py-2 text-sm duration-300",
            expanded ? "justify-between px-5" : "justify-center",
            isActive ? "bg-accent hover:bg-accent/70" : "bg-transparent",
            !subItem && "pl-9"
          )
        }
      >
        <div className="flex items-center gap-2">
          <item.Icon size={!expanded ? 20 : subItem ? 18 : 10} />
          {expanded && <span>{item.label}</span>}
        </div>
        {expanded && item.children && (
          <SlArrowRight size={12} className={cn("rotate-0 duration-300", open && "rotate-90")} />
        )}
      </NavLink>
      {expanded &&
        open &&
        item.children &&
        item.children.map((subElem, i) => <SidebarMenu key={i} item={subElem} subItem={false} expanded={expanded} />)}
    </div>
  );
});

export default SidebarMenu;
