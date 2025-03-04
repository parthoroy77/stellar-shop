import { columns } from "@/components/data-tables/product/products/column";
import ProductDataTable from "@/components/data-tables/product/products/data-table";
import { useGetAllProductsQuery } from "@repo/redux";

const ActiveProductsPage = () => {
  const { data, isFetching } = useGetAllProductsQuery(`status=active`);

  const products = data?.data || [];

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-medium">Products List</h1>
      <ProductDataTable data={products} columns={columns} isLoading={isFetching} />
    </div>
  );
};

export default ActiveProductsPage;
