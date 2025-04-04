import { getOrderDetail } from "@/actions/order";
import { OrderActivityTimeline, OrderItemSummary } from "@ui/index";
import { notFound } from "next/navigation";
import Header from "./components/header";
import PaymentInformation from "./components/payment-information";
import Summary from "./components/summary";

type TParams = { id: string };
const OrderDetailPage = async ({ params }: { params: TParams }) => {
  const orderId = +params.id;
  const order = await getOrderDetail(orderId);

  if (!order) {
    notFound();
  }
  return (
    <div className="space-y-5">
      {/* Header */}
      <Header orderId={order.uniqueId} />
      <hr />
      <section className="flex flex-col items-start gap-5 lg:flex-row">
        <div className="w-full flex-1 rounded-md border *:p-4">
          <OrderItemSummary items={order.orderItems} />
        </div>
        <div className="w-full space-y-4 *:rounded-md *:border *:p-4 lg:w-[30%]">
          <PaymentInformation status={order.paymentStatus} method={order.paymentMethod} />
          <Summary order={order} />
        </div>
      </section>
      <div className="rounded-md border p-4 *:*:space-y-3">
        <OrderActivityTimeline statusHistory={order.orderStatusHistory} />
      </div>
    </div>
  );
};

export default OrderDetailPage;
