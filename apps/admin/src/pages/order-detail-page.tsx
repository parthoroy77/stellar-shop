import { useGetOrderDetailQuery } from "@repo/redux";
import { TOrder } from "@repo/utils/types";
import { OrderHeader } from "@ui/index";
import { useParams } from "react-router-dom";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const { data, isFetching } = useGetOrderDetailQuery(orderId!, {
    skip: !orderId,
  });

  if (isFetching) {
    return <div>Loading</div>;
  }

  const order = data?.data as TOrder;

  return (
    <div className="space-y-5">
      <OrderHeader
        orderId={order.uniqueId}
        paymentStatus={order.paymentStatus}
        placedAt={order.orderPlacedAt}
        status={order.status}
      />
      <hr />
    </div>
  );
};

export default OrderDetailPage;
