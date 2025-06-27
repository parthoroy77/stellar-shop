import { toNormalCase } from "@repo/utils/functions";
import { TOrder } from "@repo/utils/types";
import { Badge } from "@ui/index";

const Summary = ({ order, totalItems }: { order: TOrder; totalItems: number }) => {
  const { totalAmount, shippingAmount, discountAmount, netAmount } = order;
  return (
    <div className="h-fit w-full space-y-3">
      <h5 className="flex justify-between text-sm font-medium uppercase">
        <span>Order Status: </span>
        <Badge
          variant={order.status === "CANCELED" ? "destructive" : order.status === "DELIVERED" ? "success" : "accent"}
          className="rounded-md capitalize"
        >
          {toNormalCase(order.status).toLowerCase()}
        </Badge>
      </h5>
      <hr />
      <div>
        <h5 className="text-sm font-medium uppercase">Order Summary</h5>
        <div className="text-accent-foreground divide-y text-sm font-medium *:py-3">
          <div className="flex items-center justify-between">
            <span>Subtotal ({totalItems} items)</span>
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
    </div>
  );
};

export default Summary;
