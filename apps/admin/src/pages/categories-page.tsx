import AddCategoryTrigger from "@/components/category/add-category-trigger";
import { columns } from "@/components/data-tables/category/columns";
import CategoryListTable from "@/components/data-tables/category/data-table";
import { useGetAllCategoriesQuery } from "@repo/redux";

const CategoriesPage = () => {
  const { data, isFetching } = useGetAllCategoriesQuery("");
  const categories = data?.data || [];
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Categories</h1>
        <AddCategoryTrigger />
      </div>
      <CategoryListTable data={categories} columns={columns} isLoading={isFetching} />
    </div>
  );
};

export default CategoriesPage;
