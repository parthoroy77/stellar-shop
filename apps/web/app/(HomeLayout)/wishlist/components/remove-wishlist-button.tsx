"use client";

import { useWishlistContext } from "@/contexts/wishlist-context";
import { AppButton } from "@ui/index";
import { cn } from "@ui/lib/utils";
import { RiDeleteBinLine } from "react-icons/ri";

const RemoveWishlistButton = ({
  productId,
  productVariantId,
  isMobile,
}: {
  productId: number;
  productVariantId?: number;
  isMobile: boolean;
}) => {
  const { toggleWishlist } = useWishlistContext();
  const handleRemove = () => {
    toggleWishlist({ productId, productVariantId });
  };
  return (
    <AppButton
      onClick={handleRemove}
      variant={isMobile ? "ghost" : "accent"}
      size={isMobile ? "sm" : "icon"}
      className={cn(isMobile ? "h-fit w-fit rounded-full border p-1" : "h-fit w-fit border p-1.5")}
    >
      <RiDeleteBinLine size={isMobile ? 15 : 17} />
    </AppButton>
  );
};

export default RemoveWishlistButton;
