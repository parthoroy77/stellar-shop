import { TOrder } from "@repo/utils/types";

const Summary = ({ order }: { order: TOrder }) => {
  const { totalAmount, shippingAmount, discountAmount, netAmount, orderItems } = order;
  return (
    <div className="h-fit w-full">
      <h5 className="text-sm font-medium uppercase">Order Summary</h5>
      <div className="text-accent-foreground divide-y text-sm font-medium *:py-3">
        <div className="flex items-center justify-between">
          <span>Subtotal ({orderItems.length} items)</span>
          <span className="text-black">${totalAmount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="text-black">- ${discountAmount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span className="text-black">+ ${shippingAmount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total</span>
          <span className="text-black">${netAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
