import { getPaymentMethods } from "@/actions/payment";
import CheckoutPaymentMethods from "./checkout-payment-methods";

const PaymentMethod = async ({ selectedPaymentMethod }: { selectedPaymentMethod: number | null }) => {
  const paymentMethods = await getPaymentMethods();
  return (
    <div className="space-y-2 rounded-lg border-2 p-4 shadow-sm">
      <h3 className="text-primary-foreground text-lg font-medium">Select Payment Method</h3>
      {paymentMethods?.length ? (
        <CheckoutPaymentMethods paymentMethods={paymentMethods} selectedPaymentMethod={selectedPaymentMethod} />
      ) : (
        <div>No Payment method found!</div>
      )}
    </div>
  );
};

export default PaymentMethod;
