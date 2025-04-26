"use client";
import { verifyStripePayment } from "@/actions/payment";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import VerifyPaymentLoading from "./verify-payment-loading";

interface Props {
  provider: "stripe";
  stripeCheckoutSessionId: string;
  paymentId: string;
}
const VerifyPaymentView = ({ provider, stripeCheckoutSessionId }: Props) => {
  const router = useRouter();

  const handleVerifyPayment = async () => {
    switch (provider) {
      case "stripe":
        const response = await verifyStripePayment(stripeCheckoutSessionId);
        toast.success(response.message);
        if (response.success && response.data) {
          router.push("/order-success/?orderId=" + response.data.orderId);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleVerifyPayment();
  }, []);
  return (
    <div>
      <VerifyPaymentLoading />
    </div>
  );
};

export default VerifyPaymentView;
