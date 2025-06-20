import AddCategoryTrigger from "@/components/category/add-category-trigger";
import { columns } from "@/components/data-tables/category/columns";
import CategoryListTable from "@/components/data-tables/category/data-table";
import { usePagination } from "@/hooks/usePagination";
import { useGetAllCategoriesQuery } from "@repo/redux";
import { AppPagination } from "@ui/index";
import { useEffect } from "react";

const CategoriesPage = () => {
  const { pagination, handlePageChange, handleUpdatePagination } = usePagination({});

  const { data, isFetching } = useGetAllCategoriesQuery(`page=${pagination.page}&limit=${pagination.limit}`);
  const categories = data?.data || [];

  useEffect(() => {
    if (data?.meta) {
      handleUpdatePagination({ ...data.meta });
    }
  }, [data]);

  return (
    <div className="relative space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Categories</h1>
        <AddCategoryTrigger />
      </div>
      <CategoryListTable data={categories} columns={columns} isLoading={isFetching} />
      {pagination.total > pagination.limit && (
        <div className="flex justify-end">
          <div>
            <AppPagination
              currentPage={pagination.page}
              onPageChange={handlePageChange}
              totalPages={pagination.totalPages}
              maxVisiblePages={4}
              showNextButton
              showPrevButton
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
