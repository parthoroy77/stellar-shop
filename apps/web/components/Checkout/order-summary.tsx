import { getCheckoutSummary } from "@/actions/checkout";
import { TCheckoutSessionData } from "@repo/utils/types";
import CheckoutButton from "./checkout-button";

const OrderSummary = async ({ checkoutSession }: { checkoutSession: TCheckoutSessionData }) => {
  const { totalAmount, totalShippingFee, discountAmount, netAmount, totalItem } = await getCheckoutSummary();
  return (
    <div className="h-fit rounded-md border-2 p-4 shadow-sm lg:p-5">
      <h5 className="text-sm font-medium uppercase">Order Summary</h5>
      <div className="text-accent-foreground divide-y text-sm font-medium *:py-3">
        <div className="flex items-center justify-between">
          <span>Subtotal ({totalItem} items)</span>
          <span className="text-black">${totalAmount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="text-black">- ${discountAmount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span className="text-black">+ ${totalShippingFee}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total</span>
          <span className="text-black">${netAmount}</span>
        </div>
      </div>
      <CheckoutButton {...checkoutSession} />
    </div>
  );
};

export default OrderSummary;
