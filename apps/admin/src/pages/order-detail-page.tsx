import OrderTotalSummary from "@/components/order/order-total-summary";
import SubOrderItem from "@/components/order/sub-order-item";
import { useGetOrderDetailQuery } from "@repo/redux";
import { TOrder } from "@repo/utils/types";
import { OrderActivityTimeline, OrderCustomerInfo, OrderHeader, OrderNote, OrderShippingAddress } from "@ui/index";
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
      <div className="grid grid-cols-12 gap-3 *:space-y-3 *:*:rounded-md *:*:border *:*:px-5 *:*:py-3">
        <div className="col-span-7">
          <OrderTotalSummary
            totalAmount={order.totalAmount}
            grossAmount={order.grossAmount}
            discountAmount={order.discountAmount}
            netAmount={order.netAmount}
            totalItem={order.totalOrderItems}
            shippingAmount={order.shippingAmount}
          />
          <OrderNote note={order.orderNote ?? null} />
          <OrderCustomerInfo user={order.user} />
          <OrderShippingAddress address={order.orderShippingAddress} />
        </div>
        <div className="col-span-5 *:space-y-3">
          <OrderActivityTimeline statusHistory={order.orderStatusHistory} />
        </div>
      </div>
      <hr />
      <div className="divide-y rounded-md border *:px-4 *:py-3">
        {order?.subOrders?.map((subOrder) => <SubOrderItem key={subOrder.id} {...subOrder} />)}
      </div>
    </div>
  );
};

export default OrderDetailPage;
