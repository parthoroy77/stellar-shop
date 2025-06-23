"use client";
import { getNewlyArrivedProducts } from "@/actions/product";
import { useQueryData } from "@repo/tanstack-query";
import { AppPagination } from "@ui/index";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProductShowcaseSkeleton from "../ui/product-showcase-skeleton";
import ProductShowcase from "./product-showcase";
import SideBanner from "./side-banner";
type TPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const NewArrivals = () => {
  const [pagination, setPagination] = useState<TPagination>({ page: 1, limit: 4, total: 0, totalPages: 1 });

  const { data, isFetching } = useQueryData(
    ["newly-arrived", pagination.page],
    () => getNewlyArrivedProducts(`page=${pagination.page}&limit=${pagination.limit}`),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
  const products = useMemo(() => data?.data || [], [data]);

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
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full lg:w-72">
        <SideBanner
          heading="Newly Arrived"
          subHeading="Free Shipping Over $50"
          className="text-accent-foreground bg-[url('/ui-images/sidebar-2.jpg')] bg-cover bg-left"
        />
      </div>
      <div className="w-full space-y-5 lg:w-[80%]">
        {!isFetching ? (
          <ProductShowcase isDemo={!(products.length > 0)} products={products} />
        ) : (
          <ProductShowcaseSkeleton />
        )}
        {pagination.total > pagination.limit && (
          <div className="flex justify-start">
            <div>
              <AppPagination
                currentPage={pagination.page}
                onPageChange={handlePageChange}
                totalPages={pagination.totalPages}
                maxVisiblePages={4}
                showNextButton
                showPrevButton={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
