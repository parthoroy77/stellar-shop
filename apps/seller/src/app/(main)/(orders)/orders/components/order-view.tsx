"use client";

import { getAllOrders } from "@/actions/order.action";
import { columns } from "@/components/data-table/order/column";
import OrderDataTable from "@/components/data-table/order/data-table";
import { useQueryData } from "@repo/tanstack-query";
import { SubOrderStatus } from "@repo/utils/types";
import { AppPagination, Tabs, TabsList, TabsTrigger } from "@ui/index";
import { useCallback, useEffect, useMemo, useState } from "react";

const orderTabs = [
  { label: "Pending Orders", value: SubOrderStatus.PROCESSING },
  { label: "Confirmed Orders", value: SubOrderStatus.CONFIRMED },
  { label: "Packed Orders", value: SubOrderStatus.PACKED },
  { label: "Shipped Orders", value: SubOrderStatus.SHIPPED },
];

type TPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const OrderView = () => {
  const [status, setStatus] = useState(SubOrderStatus.PROCESSING);
  const [pagination, setPagination] = useState<TPagination>({ page: 1, limit: 10, total: 0, totalPages: 1 });

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

  return (
    <div className="space-y-5">
      <Tabs defaultValue={status} onValueChange={(value) => setStatus(value as SubOrderStatus)}>
        <TabsList className="h-9">
          {orderTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="h-7 min-w-36 text-xs">
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
  );
};

export default OrderView;
