"use client";
import { getNewlyArrivedProducts } from "@/actions/product";
import { useQueryData } from "@repo/tanstack-query";
import { AppPagination } from "@ui/index";
import { useCallback, useEffect, useState } from "react";
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
  const products = data?.data || [];

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
      <div className="w-full lg:w-[20%]">
        <SideBanner
          heading="Newly Arrived"
          subHeading="Free Shipping Over $50"
          image="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/TSW-SNETTERTON-300x300.png"
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
