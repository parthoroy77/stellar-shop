"use client";
import { useWishlistContext } from "@/contexts/wishlist-context";
import useAuthRedirect from "@/hooks/use-auth-redirect";
import { useClientSession } from "@/lib/auth-utils";
import { AppButton } from "@ui/index";
import { ClassValue, cn } from "@ui/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "sonner";
import TooltipComponent from "./tooltip-component";

const ToggleWishlistButton = ({ productId, className }: { productId: number; className?: ClassValue }) => {
  const router = useRouter();
  const { isAuthenticated } = useClientSession();
  const { isInWishlist, toggleWishlist } = useWishlistContext();
  const pathname = usePathname();
  const inWishlist = useMemo(() => isInWishlist(productId), [isInWishlist, productId]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isAuthenticated) {
        toast.info("Please log in first!");
        useAuthRedirect(router, pathname);
        return;
      } else {
        // toggle wishlist
        toggleWishlist({ productId });
      }
    },
    [inWishlist, isAuthenticated, productId, router]
  );

  return (
    <div onClick={handleClick}>
      <TooltipComponent tooltipContent="Add to wishlist">
        <AppButton
          className={cn(
            "bg-muted-foreground flex size-8 items-center justify-center rounded-full p-0 text-xl text-black",
            className
          )}
        >
          {inWishlist ? <BsHeartFill aria-label="Wishlist" color="red" /> : <BsHeart aria-label="Wishlist" />}
        </AppButton>
      </TooltipComponent>
    </div>
  );
};

export default ToggleWishlistButton;
