"use client";
import { useWishlistContext } from "@/contexts/wishlist-context";
import { useClientSession } from "@/lib/auth-utils";
import { AppButton } from "@ui/index";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "sonner";
import TooltipComponent from "./tooltip-component";

const ToggleWishlistButton = ({ productId }: { productId: number }) => {
  const router = useRouter();
  const { isAuthenticated } = useClientSession();
  const { isInWishlist, toggleWishlist } = useWishlistContext();

  const inWishlist = useMemo(() => isInWishlist(productId), [isInWishlist, productId]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isAuthenticated) {
        toast.info("Please log in first!");
        router.push("/login");
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
        <AppButton className="bg-muted-foreground flex size-5 items-center justify-center rounded-full p-0 text-black md:size-6 lg:size-8 lg:text-[20px]">
          {inWishlist ? <BsHeartFill aria-label="Wishlist" color="red" /> : <BsHeart aria-label="Wishlist" />}
        </AppButton>
      </TooltipComponent>
    </div>
  );
};

export default ToggleWishlistButton;
