import { sidebarItems } from "@/constants/sidebar-items";
import { cn } from "@ui/lib/utils";
import { useCallback, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { LiaCircleSolid, LiaDotCircle } from "react-icons/lia";
import { PiShoppingCart } from "react-icons/pi";
import SidebarMenu from "./sidebar-menu";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const [mouseEnter, setMouseEnter] = useState(false);

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
        className={cn(
          "fixed inset-y-0 left-0 z-50 h-screen space-y-3 divide-y border bg-white transition-all duration-300 ease-in-out *:px-3 *:pt-3",
          expanded ? "custom-scrollbar w-64" : "w-16 overflow-hidden",
          !expanded && mouseEnter && "w-64",
          "lg:relative lg:block",
          open ? "w-72 translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-[50px] items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-primary flex size-10 items-center justify-center rounded-md text-2xl text-white">
              <PiShoppingCart />
            </span>
            <h3
              className={cn(
                "w-0 overflow-hidden text-nowrap text-xl font-bold capitalize transition-all duration-300 ease-in-out",
                (expanded || mouseEnter) && "w-fit"
              )}
            >
              <span className="text-primary">Stellar</span> <span className="text-secondary">shop</span>
            </h3>
          </div>
          <button type="button" onClick={toggleExpanded} className="hidden lg:block">
            {expanded ? <LiaDotCircle size={22} /> : <LiaCircleSolid size={22} />}
          </button>
          <button type="button" onClick={() => setOpen(false)} className="lg:hidden">
            <HiOutlineXMark size={22} />
          </button>
        </div>
        <nav className={"space-y-2"}>
          {sidebarItems.map((x, i) => (
            <SidebarMenu expanded={expanded || mouseEnter} key={i} item={x} />
          ))}
        </nav>
      </aside>
    </>
  );
}
