import { columns } from "@/components/data-tables/seller-approval/column";
import SellerApprovalTable from "@/components/data-tables/seller-approval/data-table";

const SellerApprovalPage = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-medium">Unapproved Seller Lists</h1>
      <SellerApprovalTable data={[]} columns={columns} isLoading={false} />
    </div>
  );
};

export default SellerApprovalPage;
