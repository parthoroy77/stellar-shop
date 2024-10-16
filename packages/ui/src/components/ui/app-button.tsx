import { cn } from "@ui/lib/utils";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { buttonVariants } from "./button";

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  hideElement?: boolean;
}

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, variant, size, children, hideElement, loading = false, ...props }, ref) => {
    const Comp = "button";
    return (
      <Comp
        className={cn(
          "flex items-center justify-center gap-4 duration-300",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      >
        {loading && (
          <span className="block animate-spin">
            <AiOutlineLoading />
          </span>
        )}
        {!hideElement && children}
      </Comp>
    );
  }
);
AppButton.displayName = "AppButton";

export default AppButton;
