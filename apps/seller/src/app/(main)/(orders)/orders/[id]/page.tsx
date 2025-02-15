import { getOrderDetails } from "@/actions/order.action";
import { OrderActivityTimeline, OrderCustomerInfo, OrderHeader, OrderNote } from "@ui/index";
import { notFound } from "next/navigation";
import OrderItemSummary from "./components/order-item-summary";
import OrderShippingAddress from "./components/order-shipping-address";
import OrderSummary from "./components/order-summary";

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
      <section className="*:*rounded-md flex flex-col items-start gap-5 *:*:space-y-2 *:space-y-3 *:*:rounded-md *:*:border *:*:px-5 *:*:py-3 lg:flex-row">
        <div className="flex-1">
          <OrderItemSummary items={orderItems} />
          <OrderActivityTimeline statusHistory={mainOrder.orderStatusHistory} />
        </div>
        <aside className="w-full lg:w-[30%]">
          <OrderNote note={subOrder.orderNote || null} />
          <OrderSummary
            totalItem={orderItems.length}
            netAmount={subOrder.netAmount}
            total={subOrder.totalAmount}
            discount={subOrder.discountAmount}
          />
          <OrderCustomerInfo user={mainOrder.user} />
          <OrderShippingAddress address={mainOrder.orderShippingAddress} />
        </aside>
      </section>
    </div>
  );
};

export default OrderDetailPage;
