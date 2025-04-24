"use client";
import PrePaymentLoading from "@/components/Payment/pre-payment-loading";
import { notFound } from "next/navigation";

const PaymentPage = ({ searchParams }: { searchParams: { orderId: string } }) => {
  const orderId = searchParams.orderId;

  if (!orderId) {
    notFound();
  }

  return (
    <div className="py-5">
      <PrePaymentLoading orderId={orderId} />
    </div>
  );
};

export default PaymentPage;
