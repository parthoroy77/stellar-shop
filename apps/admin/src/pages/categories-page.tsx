import AddCategoryTrigger from "@/components/category/add-category-trigger";
import CategoryListTable from "@/components/category/list/category-list-table";

const CategoriesPage = () => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Categories</h1>
        <AddCategoryTrigger />
      </div>
      <CategoryListTable />
    </div>
  );
};

export default CategoriesPage;
