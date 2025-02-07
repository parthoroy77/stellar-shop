"use client";
import { getAllOrders } from "@/actions/order.action";
import { columns } from "@/components/data-table/order/column";
import OrderDataTable from "@/components/data-table/order/data-table";
import { useQueryData } from "@repo/tanstack-query";
import { SubOrderStatus } from "@repo/utils/types";
import { Tabs, TabsList, TabsTrigger } from "@ui/index";
import { useState } from "react";

const orderTabs = [
  {
    label: "Pending Orders",
    value: SubOrderStatus.PROCESSING,
  },
  {
    label: "Confirmed Orders",
    value: SubOrderStatus.CONFIRMED,
  },
  {
    label: "Packed Orders",
    value: SubOrderStatus.PACKED,
  },
  {
    label: "Shipped Orders",
    value: SubOrderStatus.SHIPPED,
  },
];

const OrderView = () => {
  const [status, setStatus] = useState(SubOrderStatus.PROCESSING);
  const { data, isFetching } = useQueryData(["orders"], () => getAllOrders(`status=${status}`), {
    refetchOnWindowFocus: false,
    staleTime: 60,
  });
  return (
    <div className="space-y-5">
      <Tabs defaultValue={status}>
        <TabsList className="h-9">
          {orderTabs.map((tab, i) => (
            <TabsTrigger
              value={tab.value}
              key={i}
              onClick={() => setStatus(tab.value)}
              className="h-7 min-w-36 text-xs"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <OrderDataTable columns={columns} isLoading={isFetching} data={data || []} />
    </div>
  );
};

export default OrderView;
