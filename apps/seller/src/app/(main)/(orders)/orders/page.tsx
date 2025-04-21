import OrderView from "./components/order-view";

const OrdersPage = () => {
  return (
    <div className="divide-y *:px-5 *:py-3">
      <h2 className="text-xl font-medium">Manage Orders</h2>
      <OrderView />
    </div>
  );
};

export default OrdersPage;
