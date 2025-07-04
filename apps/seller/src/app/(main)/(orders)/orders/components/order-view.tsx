"use client";

import { getAllOrders } from "@/actions/order.action";
import { columns } from "@/components/data-table/order/column";
import OrderDataTable from "@/components/data-table/order/data-table";
import { useQueryData } from "@repo/tanstack-query";
import { countOrderStatuses } from "@repo/utils/functions";
import { SubOrderStatus, TPaginationState } from "@repo/utils/types";
import { AppPagination, OrderMetrics, Tabs, TabsList, TabsTrigger } from "@ui/index";
import { useCallback, useEffect, useMemo, useState } from "react";

const orderTabs = [
  { label: "All", value: "" },
  { label: "Pending", value: SubOrderStatus.PROCESSING },
  { label: "Confirmed", value: SubOrderStatus.CONFIRMED },
  { label: "Packed", value: SubOrderStatus.PACKED },
  { label: "Shipped", value: SubOrderStatus.SHIPPED },
];

const OrderView = () => {
  const [status, setStatus] = useState("");
  const [pagination, setPagination] = useState<TPaginationState>({ page: 1, limit: 10, total: 0, totalPages: 1 });

  // Fetch data using pagination parameters
  const { data, isFetching } = useQueryData(
    ["orders", status, pagination.page],
    () => getAllOrders(`status=${status}&page=${pagination.page}&limit=${pagination.limit}`),
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
    }
  );

  // Memoized order data
  const orders = useMemo(() => data?.data || [], [data]);

  // Update pagination details when new data is received
  useEffect(() => {
    if (data?.meta) {
      const { limit, page, total } = data.meta;
      const totalPages = Math.ceil(total / limit);
      setPagination((prev) => ({
        ...prev,
        page,
        limit,
        total,
        totalPages,
      }));
    }
  }, [data]);

  // Handle page change with useCallback for optimization
  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const counts = countOrderStatuses(orders.map((o) => o.status));
  return (
    <>
      <OrderMetrics {...counts} />
      <div className="space-y-3">
        <Tabs defaultValue={status} onValueChange={(value) => setStatus(value as SubOrderStatus)}>
          <TabsList className="h-9">
            {orderTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="h-7 text-xs lg:min-w-36">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="space-y-3">
          <OrderDataTable columns={columns} isLoading={isFetching} data={orders} />
          <div className="flex justify-center">
            <AppPagination
              totalPages={pagination.totalPages}
              currentPage={pagination.page}
              maxVisiblePages={4}
              showNextButton
              showPrevButton
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderView;
