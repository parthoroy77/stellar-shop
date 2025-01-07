import OrderSummary from "./order-summary";
import PaymentMethod from "./payment-method";
import ProductPackages from "./product-packages";
import ShippingAndBilling from "./shipping-and-billing";

const CheckoutContainer = () => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="h-full space-y-2 rounded-md *:rounded-xl *:border *:bg-neutral-50 *:p-2.5 lg:w-[70%] *:lg:p-4">
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
