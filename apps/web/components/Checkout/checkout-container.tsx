import OrderSummary from "./order-summary";
import PaymentMethod from "./payment-method";
import ProductPackages from "./product-packages";
import ShippingAndBilling from "./shipping-and-billing";

const CheckoutContainer = () => {
  return (
    <div className="flex gap-5">
      <div className="h-full w-[70%] space-y-2 rounded-md *:rounded-xl *:border *:bg-neutral-50 *:p-4">
        <ShippingAndBilling />
        <ProductPackages />
      </div>
      <aside className="space-y-3 lg:w-[30%]">
        <PaymentMethod />
        <OrderSummary />
      </aside>
    </div>
  );
};

export default CheckoutContainer;
