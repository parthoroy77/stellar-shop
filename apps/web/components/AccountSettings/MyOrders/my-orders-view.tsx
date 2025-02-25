"use client";
import { getMyOrders } from "@/actions/order";
import { useQueryData } from "@repo/tanstack-query";
import { TPaginationState } from "@repo/utils/types";
import { AppPagination, Button } from "@ui/index";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import OrderCard from "./order-card";
import OrderCardSkeleton from "./order-card-skeleton";

const MyOrderView = () => {
  const [{ page, limit, totalPages }, setPagination] = useState<TPaginationState>({
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

  return (
    <div>
      <div className="space-y-3">
        {!isFetching ? (
          orders.length > 0 ? (
            orders.map((order) => (
              <Link href={"/my-orders/" + order.id} key={order.id}>
                <OrderCard order={order} />
              </Link>
            ))
          ) : (
            <div className="flex h-40 flex-col items-center justify-center gap-3 text-center text-lg font-medium">
              <h3>No order placed yet</h3>
              <Link href={"/"}>
                <Button className="space-x-2">
                  <span>Shop Now</span>

                  <GoArrowUpRight />
                </Button>
              </Link>
            </div>
          )
        ) : (
          Array.from({ length: 2 }).map((_x, i) => <OrderCardSkeleton key={i} />)
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <AppPagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          maxVisiblePages={4}
          showNextButton
          showPrevButton
        />
      </div>
    </div>
  );
};

export default MyOrderView;
