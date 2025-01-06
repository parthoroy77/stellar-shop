import { getCartSummary } from "@/actions/cart";
import { useQueryData } from "@repo/tanstack-query";
import { Button, Input } from "@ui/index";
import { memo } from "react";

const CartSummary = ({ selectedItemIds }: { selectedItemIds: number[] }) => {
  // Fetch cart summary from backend and cache data
  const { data, isFetching } = useQueryData(["cart-summary", selectedItemIds], () => getCartSummary(selectedItemIds), {
    enabled: selectedItemIds.length > 0,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000, // 1 minute: Avoid refetching for 1 minute
  });

  const { subTotal = 0, total = 0, totalItem = 0, shippingFee = 0 } = data || {};

  return (
    <div
      className="h-fit rounded-md border-2 p-4 shadow-sm lg:w-[25%] lg:p-5"
      style={{ opacity: isFetching ? 0.6 : 1 }}
    >
      <h5 className="text-sm font-medium uppercase">Cart Summary</h5>
      <div className="text-accent-foreground divide-y text-sm font-medium *:py-3">
        <div className="flex items-center justify-between">
          <span>Subtotal ({totalItem} items)</span>
          <span className="text-black">${subTotal}</span>
        </div>
        <div className="flex flex-col gap-3">
          <span>Coupon</span>
          <div className="flex h-[35px] items-center gap-3 *:h-full">
            <Input placeholder="STELLAR304" className="text-xs" />
            <Button variant={"accent"} size={"sm"} className="px-5">
              Applied
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span className="text-black">- $0.00</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span className="text-black">+ ${shippingFee}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total</span>
          <span className="text-black">${total}</span>
        </div>
      </div>
      <div>
        <Button size={"sm"} className="w-full">
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
};

export default memo(CartSummary);
