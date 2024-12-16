"use client";
import { useSidebar } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { LuPanelLeft } from "react-icons/lu";
import { PiCodesandboxLogo } from "react-icons/pi";

const LogoText = () => {
  const { open, toggleSidebar } = useSidebar();

  return (
    <div className={cn("flex transition-all duration-300 ease-in-out", open && "items-center gap-3")}>
      <button
        onClick={toggleSidebar}
        className="bg-accent text-primary-foreground flex h-fit items-center justify-center rounded-full p-2"
      >
        {open ? <PiCodesandboxLogo size={20} /> : <LuPanelLeft size={18} />}
      </button>
      <h3
        className={cn(
          "w-0 overflow-hidden text-nowrap text-xl font-bold capitalize transition-all duration-300 ease-in-out",
          open && "w-fit"
        )}
      >
        <span className="text-primary">Stellar</span> <span className="text-secondary">shop</span>
      </h3>
    </div>
  );
};

export default LogoText;
