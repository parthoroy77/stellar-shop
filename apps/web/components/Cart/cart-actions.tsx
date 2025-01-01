"use client";
import { useCartContext } from "@/contexts/cart-context";
import { AppButton } from "@ui/index";
import { HiXMark } from "react-icons/hi2";

const CartActions = () => {
  const { cartItemCount, clearCart } = useCartContext();
  return (
    <div className="text-accent-foreground flex items-center justify-between rounded-md border px-6 py-3 text-sm">
      {/* Select All */}
      <div className="flex items-center gap-2 font-medium capitalize text-black">
        <span>Your Cart ({cartItemCount} Items)</span>
      </div>
      {/* Delete Action */}
      <AppButton
        onClick={clearCart}
        size={"sm"}
        variant={"destructive"}
        className="hover:bg-accent hover:text-primary flex h-6 items-center gap-1 border-0 text-xs"
      >
        <HiXMark size={18} />
        <span>Clear</span>
      </AppButton>
    </div>
  );
};

export default CartActions;
