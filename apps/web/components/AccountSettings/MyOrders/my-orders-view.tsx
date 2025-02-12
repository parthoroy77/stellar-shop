"use client";
import { getMyOrders } from "@/actions/order";
import { useQueryData } from "@repo/tanstack-query";
import { TPaginationState } from "@repo/utils/types";
import { useCallback, useEffect, useMemo, useState } from "react";

const MyOrderView = () => {
  const [{ page, limit }, setPagination] = useState<TPaginationState>({
    limit: 5,
    page: 1,
    total: 0,
    totalPages: 0,
  });

  const { data, isFetching } = useQueryData(["my-orders", page], () => getMyOrders(`&page=${page}&limit=${limit}`), {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 1 minute
  });

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

  return <div></div>;
};

export default MyOrderView;
