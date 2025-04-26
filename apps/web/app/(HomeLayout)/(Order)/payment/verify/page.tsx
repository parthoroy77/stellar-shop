import VerifyPaymentView from "@/components/Payment/verify-payment-view";
import { notFound } from "next/navigation";

type TSearchParams = {
  provider: "stripe";
  stripeSessionId: string;
  paymentId: string;
};
const VerifyPaymentPage = ({ searchParams }: { searchParams: TSearchParams }) => {
  const { provider, stripeSessionId, paymentId } = searchParams;

  if (!stripeSessionId || !paymentId || !provider) {
    notFound();
  }

  return (
    <div className="py-5">
      <VerifyPaymentView provider={provider} stripeCheckoutSessionId={stripeSessionId} paymentId={paymentId} />
    </div>
  );
};

export default VerifyPaymentPage;
