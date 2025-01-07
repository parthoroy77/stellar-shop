import ProductPackages from "./product-packages";
import ShippingAndBilling from "./shipping-and-billing";

const CheckoutContainer = () => {
  return (
    <div className="flex gap-5">
      <div className="h-full w-[70%] space-y-2 rounded-md *:rounded-xl *:border *:bg-neutral-50 *:p-4">
        <ShippingAndBilling />
        <ProductPackages />
      </div>
      <div className="h-full w-[30%] space-y-5 *:p-4"></div>
    </div>
  );
};

export default CheckoutContainer;
