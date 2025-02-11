import { getOrderDetails } from "@/actions/order.action";
import { notFound } from "next/navigation";
import OrderHeader from "./components/order-header";
import OrderItem from "./components/order-item";

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
      <section className="*:*rounded-md flex items-start gap-5 *:*:space-y-3 *:space-y-3 *:*:rounded-md *:*:border *:*:px-5 *:*:py-3">
        <div className="w-[60%]">
          <div>
            <h4 className="font-medium">Order Items</h4>
            {orderItems.map((item) => (
              <OrderItem item={item} key={item.id} />
            ))}
          </div>
        </div>
        <aside className="w-[40%]">
          <div></div>
          <div></div>
          <div></div>
        </aside>
      </section>
    </div>
  );
};

export default OrderDetailPage;
