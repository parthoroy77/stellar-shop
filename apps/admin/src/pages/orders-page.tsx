import { columns } from "@/components/data-tables/order/column";
import OrdersDataTable from "@/components/data-tables/order/data-table";
import OrderTabs from "@/components/orders/order-tabs";
import { usePagination } from "@/hooks/usePagination";
import { useGetOrdersQuery } from "@repo/redux";
import { countOrderStatuses } from "@repo/utils/functions";
import { TOrderStatus } from "@repo/utils/types";
import { AppPagination, OrderMetrics } from "@ui/index";
import { useEffect, useMemo, useState } from "react";

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState<TOrderStatus | "default">("default");
  const { pagination, handlePageChange, handleUpdatePagination } = usePagination({});

  const query = useMemo(() => {
    let queryStr = `status=${activeTab !== "default" ? activeTab.toUpperCase() : ""}`;
    if (pagination) {
      queryStr += `&page=${pagination.page}&limit=${pagination.limit}`;
    }
    return queryStr;
  }, [activeTab, pagination]);

  const { data, isFetching } = useGetOrdersQuery(query, { skip: !query });

  // Memoized order data
  const orders = useMemo(() => data?.data || [], [data]);

  // Update pagination details when new data is received
  useEffect(() => {
    if (data?.meta) {
      handleUpdatePagination({ ...data.meta });
    }
  }, [data]);

  const counts = countOrderStatuses(orders.map((o) => o.status));
  return (
    <div className="space-y-3">
      <OrderMetrics {...counts} />
      <OrderTabs onChange={(value) => setActiveTab(value as TOrderStatus)} />
      <OrdersDataTable columns={columns} data={orders || []} isLoading={isFetching} />
      <div className="flex justify-center">
        <div>
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

export default OrdersPage;
