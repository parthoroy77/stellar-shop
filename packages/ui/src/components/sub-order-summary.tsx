import { FC } from "react";

interface Props {
  discount: number;
  total: number;
  netAmount: number;
  totalItem: number;
}

export const SubOrderSummary: FC<Props> = ({ total, totalItem, netAmount, discount }) => {
  return (
    <div>
      <h4 className="font-medium">Order Summary</h4>
      <div className="text-accent-foreground divide-y text-sm font-medium *:py-3">
        <div className="flex items-center justify-between">
          <span>Subtotal ({totalItem} items)</span>
          <span className="text-black">${total}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="text-black">${discount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total</span>
          <span className="text-black">${netAmount}</span>
        </div>
      </div>
    </div>
  );
};
