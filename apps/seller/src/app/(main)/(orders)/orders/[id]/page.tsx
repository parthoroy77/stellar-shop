import { getOrderDetails } from "@/actions/order.action";
import { notFound } from "next/navigation";
import OrderCustomer from "./components/order-customer";
import OrderHeader from "./components/order-header";
import OrderItemSummary from "./components/order-item-summary";
import OrderNote from "./components/order-note";
import OrderShippingAddress from "./components/order-shipping-address";

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
        <div className="flex-1">
          <OrderItemSummary items={orderItems} />
        </div>
        <aside className="w-[30%]">
          <OrderNote note={subOrder.orderNote || null} />
          <OrderCustomer user={mainOrder.user} />
          <OrderShippingAddress address={mainOrder.orderShippingAddress} />
        </aside>
      </section>
    </div>
  );
};

export default OrderDetailPage;
