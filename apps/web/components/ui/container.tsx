import { cn } from "@repo/ui/lib/utils";
import React from "react";

type TContainer = {
  className?: string;
  children: React.ReactNode;
};

const Container: React.FC<TContainer> = ({ className, children }) => {
  return (
    <div className={cn("mx-auto h-full w-full max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-24", className)}>
      {children}
    </div>
  );
};

export default Container;
