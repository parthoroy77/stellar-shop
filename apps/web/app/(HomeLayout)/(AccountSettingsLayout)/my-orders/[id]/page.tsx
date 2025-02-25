import { getOrderDetail } from "@/actions/order";
import { OrderItemSummary } from "@ui/index";
import { notFound } from "next/navigation";
import Header from "./components/header";
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
      <section className="flex items-start gap-5">
        <div className="sh flex-1 rounded-md border *:p-4">
          <OrderItemSummary items={order.orderItems} />
        </div>
        <div className="w-[30%] *:rounded-md *:border *:p-4">
          <Summary order={order} />
        </div>
      </section>
      <hr />
    </div>
  );
};

export default OrderDetailPage;
