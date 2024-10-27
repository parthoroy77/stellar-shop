import { cn } from "@ui/lib/utils";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface OffCanvasProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
}
const OffCanvas: FC<OffCanvasProps> = ({ open, setOpen, children, className }) => {
  const overlayClasses = "absolute inset-0 z-20 h-full w-full bg-black bg-opacity-50";
  return (
    <div className={cn("fixed inset-y-0 right-0 z-50 w-full border-l", open ? "" : "w-0")}>
      {open && <div className={overlayClasses} onClick={() => setOpen(false)} />}
      <div
        className={cn(
          "custom-scrollbar absolute inset-y-0 right-0 z-50 h-screen overflow-hidden overflow-y-auto bg-white duration-300",
          open ? "w-80 lg:w-96" : "w-0 translate-x-full",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export { OffCanvas };
