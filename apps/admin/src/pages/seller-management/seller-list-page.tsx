import { columns } from "@/components/data-tables/seller/column";
import SellerListTable from "@/components/data-tables/seller/data-table";
import { useGetAllSellersQuery } from "@repo/redux";

const SellerListPage = () => {
  const { data, isFetching } = useGetAllSellersQuery("");
  const sellers = data?.data || [];
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-medium">Seller Lists</h1>
      <SellerListTable data={sellers} columns={columns} isLoading={isFetching} />
    </div>
  );
};

export default SellerListPage;
