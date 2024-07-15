import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui";
import { FC, ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  tooltipContent: string;
}

const TooltipComponent: FC<TooltipProps> = ({ tooltipContent, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponent;
