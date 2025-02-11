import { getOrderDetails } from "@/actions/order.action";
import { notFound } from "next/navigation";
import OrderHeader from "./components/order-header";
import OrderItemSummary from "./components/order-item-summary";

const OrderDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  // Get order Id
  const subOrderId = (await params).id;

  if (!subOrderId) {
    notFound();
  }

  // Fetch order details
  const subOrder = await getOrderDetails(+subOrderId);

  // Handle nullish result
  if (!subOrder) {
    notFound();
  }

  const mainOrder = subOrder.order;
  const orderItems = subOrder.subOrderItems;
  return (
    <div className="divide-y *:px-5 *:py-3">
      <OrderHeader
        orderId={mainOrder.uniqueId}
        placedAt={subOrder.orderPlacedAt}
        status={mainOrder.status}
        paymentStatus={mainOrder.paymentStatus}
      />
      <section className="*:*rounded-md flex items-start gap-5 *:*:space-y-2 *:space-y-3 *:*:rounded-md *:*:border *:*:px-5 *:*:py-3">
        <div className="w-[60%]">
          <OrderItemSummary items={orderItems} />
        </div>
        <aside className="w-[40%]"></aside>
      </section>
    </div>
  );
};

export default OrderDetailPage;
