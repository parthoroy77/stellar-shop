import { cn } from "@repo/ui/lib/utils";
import React from "react";

type TContainer = {
  className?: string;
  children: React.ReactNode;
};

const Container: React.FC<TContainer> = ({ className, children }) => {
  return (
    <div className={cn("max-w-[2520px] mx-auto xl:px-24 md:px-10 sm:px-2 px-4 w-full h-full", className)}>
      {children}
    </div>
  );
};

export default Container;
