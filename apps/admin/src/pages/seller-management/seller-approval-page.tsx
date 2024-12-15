import { columns } from "@/components/data-tables/seller-approval/column";
import SellerApprovalTable from "@/components/data-tables/seller-approval/data-table";
import { useGetAllSellersQuery } from "@repo/redux";

const SellerApprovalPage = () => {
  const { data, isFetching } = useGetAllSellersQuery("status=inactive");
  const sellers = data?.data || [];
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-medium">Unapproved Seller Lists</h1>
      <SellerApprovalTable data={sellers} columns={columns} isLoading={isFetching} />
    </div>
  );
};

export default SellerApprovalPage;
