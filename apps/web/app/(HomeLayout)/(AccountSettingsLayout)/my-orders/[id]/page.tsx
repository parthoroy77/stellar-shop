type TParams = { id: string };
const OrderDetailPage = ({ params }: { params: TParams }) => {
  const orderId = +params.id;

  return <div></div>;
};

export default OrderDetailPage;
