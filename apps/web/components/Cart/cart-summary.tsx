import { Button, Input } from "@ui/index";

const CartSummary = () => {
  return (
    <div className="h-fit rounded-md border p-5 lg:w-[25%]">
      <h5 className="text-sm font-medium uppercase">Cart Summary</h5>
      <div className="text-accent-foreground divide-y text-sm font-medium *:py-3">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="text-black">$77.05</span>
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
            <span className="text-black">- $10.00</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span className="text-black">+ $77.05</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total</span>
          <span className="text-black">$77.05</span>
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

export default CartSummary;
