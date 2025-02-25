import { getOrderDetail } from "@/actions/order";
import { notFound } from "next/navigation";

type TParams = { id: string };
const OrderDetailPage = async ({ params }: { params: TParams }) => {
  const orderId = +params.id;
  const order = await getOrderDetail(orderId);

  if (!order) {
    notFound();
  }
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="space-y-1 !pt-0">
        <h1 className="text-xl font-semibold">
          Order Id: <span className="text-primary font-bold">{order.uniqueId}</span>
        </h1>
        <span className="text-accent-foreground w-2/3 text-sm">
          Below, you'll find the full history of your past order along with their current status. You can track the
          progress of each order and stay updated on its delivery status or any other relevant details.
        </span>
      </div>
      <hr />
    </div>
  );
};

export default OrderDetailPage;
