import OrderTotalSummary from "@/components/order/order-total-summary";
import { useGetOrderDetailQuery } from "@repo/redux";
import { TOrder } from "@repo/utils/types";
import { OrderActivityTimeline, OrderHeader } from "@ui/index";
import { useParams } from "react-router-dom";
type TOrderResponse = TOrder & { totalOrderItems: number };
const OrderDetailPage = () => {
  const { orderId } = useParams();
  const { data, isFetching } = useGetOrderDetailQuery(orderId!, {
    skip: !orderId,
  });

  if (isFetching) {
    return <div>Loading</div>;
  }

  const order = data?.data as TOrderResponse;

  return (
    <div className="space-y-3">
      <OrderHeader
        orderId={order.uniqueId}
        paymentStatus={order.paymentStatus}
        placedAt={order.orderPlacedAt}
        status={order.status}
      />
      <hr />
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7">
          <OrderTotalSummary
            totalAmount={order.totalAmount}
            grossAmount={order.grossAmount}
            discountAmount={order.discountAmount}
            netAmount={order.netAmount}
            totalItem={order.totalOrderItems}
            shippingAmount={order.shippingAmount}
          />
        </div>
        <div className="col-span-5">
          <div className="rounded-md border p-4">
            <OrderActivityTimeline statusHistory={order.orderStatusHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
