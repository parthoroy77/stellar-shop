import { columns } from "@/components/data-tables/product/pending-products/column";
import PendingProductTable from "@/components/data-tables/product/pending-products/data-table";
import { useGetPendingProductsQuery } from "@repo/redux";

const PendingProductsPage = () => {
  const { data, isFetching } = useGetPendingProductsQuery();
  const products = data?.data || [];
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-medium">Unapproved Products List</h1>
      <PendingProductTable data={products} columns={columns} isLoading={isFetching} />
    </div>
  );
};

export default PendingProductsPage;
