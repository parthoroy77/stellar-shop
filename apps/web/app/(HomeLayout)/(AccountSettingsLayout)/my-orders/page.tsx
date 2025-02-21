import MyOrderHeader from "@/components/AccountSettings/MyOrders/my-order-header";
import MyOrderView from "@/components/AccountSettings/MyOrders/my-orders-view";

const MyOrdersPage = async () => {
  return (
    <div className="space-y-5">
      <MyOrderHeader />
      <hr />
      <MyOrderView />
    </div>
  );
};

export default MyOrdersPage;
