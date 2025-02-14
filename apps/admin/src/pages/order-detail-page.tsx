import { useGetOrderDetailQuery } from "@repo/redux";
import { useParams } from "react-router-dom";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const { data, isFetching } = useGetOrderDetailQuery(orderId!, {
    skip: !orderId,
  });

  if (isFetching) {
    return <div>Loading</div>;
  }

  const order = data?.data || {};

  return <div></div>;
};

export default OrderDetailPage;
