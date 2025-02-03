import { getUserCheckoutSession } from "@/actions/checkout";
import CheckoutContainer from "@/components/Checkout/checkout-container";
import EmptyCheckout from "@/components/Checkout/empty-checkout";
import { redirect } from "next/navigation";

const CheckoutPage = async () => {
  const checkoutSession = await getUserCheckoutSession();
  if (!checkoutSession) {
    redirect("/");
  }
  return <div className="py-5">{checkoutSession ? <CheckoutContainer {...checkoutSession} /> : <EmptyCheckout />}</div>;
};

export default CheckoutPage;
