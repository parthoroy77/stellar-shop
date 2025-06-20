import { columns } from "@/components/data-tables/product/products/column";
import ProductDataTable from "@/components/data-tables/product/products/data-table";
import { usePagination } from "@/hooks/usePagination";
import { useGetAllProductsQuery } from "@repo/redux";
import { AppPagination } from "@ui/index";
import { useEffect, useMemo } from "react";

const ActiveProductsPage = () => {
  const { pagination, handlePageChange, handleUpdatePagination } = usePagination({});

  const query = useMemo(() => {
    let queryStr = `status=active`;
    if (pagination) {
      queryStr += `&page=${pagination.page}&limit=${pagination.limit}`;
    }
    return queryStr;
  }, [pagination]);

  const { data, isFetching } = useGetAllProductsQuery(query);

  const products = data?.data || [];

  useEffect(() => {
    if (data?.meta) {
      handleUpdatePagination({ ...data.meta });
    }
  }, [data]);

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
