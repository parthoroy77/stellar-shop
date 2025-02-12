import MyOrderHeader from "@/components/AccountSettings/MyOrders/my-order-header";
import MyOrderView from "@/components/AccountSettings/MyOrders/my-orders-view";

const MyOrdersPage = async () => {
  return (
    <div className="divide-y *:py-5">
      <MyOrderHeader />
      <MyOrderView />
    </div>
  );
};

export default MyOrdersPage;
