import OrderTabs from "@/components/orders/order-tabs";
import { TOrderStatus } from "@repo/utils/types";
import { useState } from "react";

const OrdersPage = () => {
  const [, setActiveTab] = useState<TOrderStatus | "default">("default");

  return (
    <div>
      <OrderTabs onChange={(value) => setActiveTab(value as TOrderStatus)} />
    </div>
  );
};

export default OrdersPage;
