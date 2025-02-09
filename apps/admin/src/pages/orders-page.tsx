import { columns } from "@/components/data-tables/order/column";
import OrdersDataTable from "@/components/data-tables/order/data-table";
import OrderTabs from "@/components/orders/order-tabs";
import { useGetOrdersQuery } from "@repo/redux";
import { TOrderStatus } from "@repo/utils/types";
import { AppPagination } from "@ui/index";
import { useCallback, useEffect, useMemo, useState } from "react";
type TPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState<TOrderStatus | "default">("default");
  const [pagination, setPagination] = useState<TPagination>({ page: 1, limit: 10, total: 0, totalPages: 1 });

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

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  return (
    <div className="space-y-5">
      <OrderTabs onChange={(value) => setActiveTab(value as TOrderStatus)} />
      <div className="space-y-3">
        <OrdersDataTable columns={columns} data={orders || []} isLoading={isFetching} />
        <div className="flex justify-start">
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
    </div>
  );
};

export default OrdersPage;
