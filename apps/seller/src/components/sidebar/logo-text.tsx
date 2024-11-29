"use client";
import { useSidebar } from "@ui/index";
import { cn } from "@ui/lib/utils";
import { PiCodesandboxLogo } from "react-icons/pi";
const LogoText = () => {
  const { open } = useSidebar();

  return (
    <div className={cn("flex transition-all duration-300 ease-in-out", open && "items-center gap-3")}>
      <span className="bg-accent text-primary-foreground flex h-fit items-center justify-center rounded-full p-2">
        <PiCodesandboxLogo size={20} />
      </span>
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
