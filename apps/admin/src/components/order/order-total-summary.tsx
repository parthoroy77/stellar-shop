import { FC } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

interface Props {
  totalAmount: number;
  discountAmount: number;
  shippingAmount: number;
  grossAmount: number;
  netAmount: number;
  totalItem: number;
}

const OrderTotalSummary: FC<Props> = ({
  totalAmount,
  totalItem,
  netAmount,
  grossAmount,
  shippingAmount,
  discountAmount,
}) => {
  return (
    <div className="rounded-md border p-4">
      <h4 className="font-medium">Order Grand Summary</h4>
      <div className="text-accent-foreground divide-y text-sm font-medium *:py-3">
        <div className="flex items-center justify-between">
          <span>Subtotal ({totalItem} items)</span>
          <span className="flex items-center gap-1 text-black">
            <LuPlus color="green" />${totalAmount}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="flex items-center gap-1 text-black">
            <LuMinus />${discountAmount}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Gross Amount</span>
          <span className="flex items-center gap-1 text-black">
            <LuPlus color="green" />${grossAmount}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping Fee</span>
          <span className="flex items-center gap-1 text-black">
            <LuPlus color="green" />${shippingAmount}
          </span>
        </div>
        <div className="flex items-center justify-between !pb-0">
          <span>Grand Total</span>
          <span className="flex items-center gap-1 text-black">${netAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderTotalSummary;
