"use client";
import { initiatePayment } from "@/actions/payment";
import PrePaymentLoading from "@/components/Payment/pre-payment-loading";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const PaymentPage = ({ searchParams }: { searchParams: { orderId: string } }) => {
  const orderId = searchParams.orderId;
  const router = useRouter();

  if (!orderId) {
    notFound();
  }

  useEffect(() => {
    const fn = async () => {
      const response = await initiatePayment(orderId);
      if (response.success && response.data?.redirectUrl) {
        window.location.href = response.data?.redirectUrl;
      }
      if (!response.success) {
        toast.error(response.message);
        router.push("/");
      }
    };
    fn();
  }, []);
  return (
    <div className="py-5">
      <PrePaymentLoading orderId={orderId} />
    </div>
  );
};

export default PaymentPage;
