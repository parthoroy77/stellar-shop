import { buttonVariants } from "@ui/index";
import { cn } from "@ui/lib/utils";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { AiOutlineLoading } from "react-icons/ai";

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, variant, size, children, loading = false, ...props }, ref) => {
    const Comp = "button";
    return (
      <Comp
        className={cn(
          "flex items-center justify-center gap-2 duration-300",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      >
        {loading && (
          <span className="mr-2 block animate-spin">
            <AiOutlineLoading />
          </span>
        )}
        {children}
      </Comp>
    );
  }
);
AppButton.displayName = "AppButton";

export default AppButton;
