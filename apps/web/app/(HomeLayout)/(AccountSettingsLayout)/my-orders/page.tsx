import OrderHistoryView from "@/components/AccountSettings/MyOrders/order-history-view";

const MyOrdersPage = () => {
  return (
    <div className="divide-y *:py-5">
      <div className="space-y-1 !pt-0">
        <h1 className="text-xl font-semibold">My Orders</h1>
        <span className="text-accent-foreground w-2/3 text-sm">
          Below, you'll find history of all your past orders along with their current status. You can track the progress
          of each order and stay updated on its delivery status or any other relevant details.
        </span>
      </div>
      <OrderHistoryView />
    </div>
  );
};

export default MyOrdersPage;
