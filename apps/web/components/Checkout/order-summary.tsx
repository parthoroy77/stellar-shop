import { Button } from "@ui/index";

const OrderSummary = () => {
  const { subTotal, total, totalItem, shippingFee } = { subTotal: 0, total: 0, totalItem: 0, shippingFee: 0 };

  return (
    <div className="h-fit rounded-md border-2 p-4 shadow-sm lg:p-5">
      <h5 className="text-sm font-medium uppercase">Order Summary</h5>
      <div className="text-accent-foreground divide-y text-sm font-medium *:py-3">
        <div className="flex items-center justify-between">
          <span>Subtotal ({totalItem} items)</span>
          <span className="text-black">${subTotal}</span>
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
        <Button className="w-full">Checkout</Button>
      </div>
    </div>
  );
};

export default OrderSummary;
