import { getOrderDetail } from "@/actions/order";
import OrderItemCard from "@/components/AccountSettings/MyOrders/order-item-card";
import OrderSellerInformation from "@/components/AccountSettings/MyOrders/order-seller-information";
import AddReviewModalForm from "@/components/Forms/add-review-modal-form";
import { OrderActivityTimeline } from "@ui/index";
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

  const totalItems = order?.subOrders?.reduce((acc, curr) => acc + curr.subOrderItems.length, 0) || 0;
  return (
    <div className="space-y-5">
      {/* Header */}
      <Header orderId={order.uniqueId} />
      <hr />
      <section className="flex flex-col items-start gap-5 lg:flex-row">
        <div className="w-full flex-1 space-y-3">
          {order.subOrders.map((subOrder, idx) => (
            <div key={subOrder.id} className="divide-y rounded-md border *:p-4">
              <OrderSellerInformation status={subOrder.status} packageNumber={idx + 1} seller={subOrder.seller} />
              {subOrder.subOrderItems.map((item, i) => (
                <div key={item.id} className="flex items-start gap-3">
                  <OrderItemCard item={item} key={i} />
                  {subOrder.status === "DELIVERED" && <AddReviewModalForm productId={item.productId} />}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="w-full space-y-4 *:rounded-md *:border *:p-4 lg:w-[30%]">
          <PaymentInformation status={order.paymentStatus} method={order.paymentMethod} />
          <Summary totalItems={totalItems} order={order} />
        </div>
      </section>
      <div className="rounded-md border p-4 *:*:space-y-3">
        <OrderActivityTimeline statusHistory={order.orderStatusHistory} />
      </div>
    </div>
  );
};

export default OrderDetailPage;
