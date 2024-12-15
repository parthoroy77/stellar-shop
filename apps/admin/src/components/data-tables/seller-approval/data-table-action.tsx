import { handleApiError, useApproveSellerMutation } from "@repo/redux";
import { TSeller } from "@repo/utils/types";
import { AppButton, Button } from "@ui/index";
import { Row } from "@ui/tanstack-table";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const SellerApprovalDataTableAction = ({ row }: { row: Row<TSeller> }) => {
  const [approveSeller, { isLoading }] = useApproveSellerMutation();
  const handleApprove = async () => {
    const toastId = toast.loading("Sending request to approve!", { duration: 3000 });
    try {
      const res = await approveSeller(row?.original?.id).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      const appError = handleApiError(error);
      toast.error(appError.message, { id: toastId });
    }
  };
  return (
    <div className="flex justify-start gap-2">
      <Link
        // TODO: redirect to seller details page where show his detail profile.
        to={"/"}
      >
        <Button variant={"accent"} className="h-fit w-fit border px-3 py-1" size={"sm"}>
          View Details
        </Button>
      </Link>
      <AppButton
        onClick={handleApprove}
        loading={isLoading}
        variant={"success"}
        className="h-fit w-fit border px-3 py-1"
        size={"sm"}
      >
        Approve
      </AppButton>
    </div>
  );
};

export default SellerApprovalDataTableAction;
