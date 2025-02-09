import { columns } from "@/components/data-tables/order/column";
import OrdersDataTable from "@/components/data-tables/order/data-table";
import OrderTabs from "@/components/orders/order-tabs";
import { useGetOrdersQuery } from "@repo/redux";
import { TOrderStatus } from "@repo/utils/types";
import { useMemo, useState } from "react";

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState<TOrderStatus | "default">("default");
  const query = useMemo(() => `status=${activeTab !== "default" ? activeTab.toUpperCase() : ""}`, [activeTab]);

  const { data, isFetching } = useGetOrdersQuery(query, { skip: !query });
  return (
    <div className="space-y-5">
      <OrderTabs onChange={(value) => setActiveTab(value as TOrderStatus)} />
      <OrdersDataTable columns={columns} data={data?.data || []} isLoading={isFetching} />
    </div>
  );
};

export default OrdersPage;
