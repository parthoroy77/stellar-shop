import { columns } from "@/components/data-tables/product/products/column";
import ProductDataTable from "@/components/data-tables/product/products/data-table";
import { useGetAllProductsQuery } from "@repo/redux";
import { TPaginationState } from "@repo/utils/types";
import { AppPagination } from "@ui/index";
import { useCallback, useEffect, useMemo, useState } from "react";

const ActiveProductsPage = () => {
  const [pagination, setPagination] = useState<TPaginationState>({ page: 1, limit: 10, total: 0, totalPages: 1 });

  const query = useMemo(() => {
    let queryStr = `status=active`;
    if (pagination) {
      queryStr += `&page=${pagination.page}&limit=${pagination.limit}`;
    }
    return queryStr;
  }, [pagination]);

  const { data, isFetching } = useGetAllProductsQuery(query);

  const products = data?.data || [];

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
      <h1 className="text-xl font-medium">Products List</h1>
      <ProductDataTable data={products} columns={columns} isLoading={isFetching} />
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

export default ActiveProductsPage;
