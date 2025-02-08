"use client";

import { getAllOrders } from "@/actions/order.action";
import { columns } from "@/components/data-table/order/column";
import OrderDataTable from "@/components/data-table/order/data-table";
import { useQueryData } from "@repo/tanstack-query";
import { SubOrderStatus } from "@repo/utils/types";
import { AppPagination, Tabs, TabsList, TabsTrigger } from "@ui/index";
import { useCallback, useState } from "react";

const orderTabs = [
  { label: "Pending Orders", value: SubOrderStatus.PROCESSING },
  { label: "Confirmed Orders", value: SubOrderStatus.CONFIRMED },
  { label: "Packed Orders", value: SubOrderStatus.PACKED },
  { label: "Shipped Orders", value: SubOrderStatus.SHIPPED },
];

const OrderView = () => {
  const [status, setStatus] = useState(SubOrderStatus.PROCESSING);

  const handleStatusChange = useCallback((value: SubOrderStatus) => {
    setStatus(value);
  }, []);

  const { data, isFetching } = useQueryData(["orders", status], () => getAllOrders(`status=${status}`), {
    refetchOnWindowFocus: false,
    staleTime: 60,
  });

  return (
    <div className="space-y-5">
      <Tabs defaultValue={status} onValueChange={(value) => handleStatusChange(value as SubOrderStatus)}>
        <TabsList className="h-9">
          {orderTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="h-7 min-w-36 text-xs">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="space-y-3">
        <OrderDataTable columns={columns} isLoading={isFetching} data={data || []} />
        <div className="flex justify-center">
          <AppPagination
            totalPages={3}
            currentPage={1}
            maxVisiblePages={4}
            showNextButton
            showPrevButton
            onPageChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderView;
