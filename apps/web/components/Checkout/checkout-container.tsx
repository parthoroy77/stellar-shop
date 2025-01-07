import ShippingAndBilling from "./shipping-and-billing";

const CheckoutContainer = () => {
  return (
    <div className="flex h-[500px] gap-5">
      <div className="h-full w-[70%] space-y-2 rounded-md *:rounded-xl *:border *:p-4">
        <ShippingAndBilling />
      </div>
      <div className="h-full w-[30%] space-y-5 *:p-4"></div>
    </div>
  );
};

export default CheckoutContainer;
