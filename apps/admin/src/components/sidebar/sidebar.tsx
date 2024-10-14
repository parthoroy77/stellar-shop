import { sidebarItems } from "@/constants/sidebar-items";
import { cn } from "@ui/lib/utils";
import { useCallback, useState } from "react";
import { LiaCircleSolid, LiaDotCircle } from "react-icons/lia";
import { PiShoppingCart } from "react-icons/pi";
import SidebarMenu from "./sidebar-menu";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [mouseEnter, setMouseEnter] = useState(false);

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);
  return (
    <aside
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      className={cn(
        "relative hidden h-screen space-y-3 divide-y border transition-all duration-300 ease-in-out *:px-3 *:pt-3 lg:block",
        expanded ? "custom-scrollbar w-64" : "w-16 overflow-hidden",
        !expanded && mouseEnter && "w-64"
      )}
    >
      <div className="flex h-[50px] items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="bg-primary flex size-10 items-center justify-center rounded-md text-2xl text-white">
            <PiShoppingCart />
          </span>
          <h3
            className={cn(
              "w-0 overflow-hidden text-xl font-bold capitalize transition-all duration-300 ease-in-out",
              (expanded || mouseEnter) && "w-fit"
            )}
          >
            <span className="text-primary">Stellar</span> <span className="text-secondary">shop</span>
          </h3>
        </div>
        <button type="button" onClick={toggleExpanded}>
          {expanded ? <LiaDotCircle size={22} /> : <LiaCircleSolid size={22} />}
        </button>
      </div>
      <nav className={"space-y-2"}>
        {sidebarItems.map((x, i) => (
          <SidebarMenu expanded={expanded || mouseEnter} subItem={true} key={i} item={x} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
