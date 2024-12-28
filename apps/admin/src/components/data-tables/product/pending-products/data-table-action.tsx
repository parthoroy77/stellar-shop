import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/index";

import { handleApiError, useApproveProductMutation } from "@repo/redux";
import { TProduct } from "@repo/utils/types";
import { Button } from "@ui/index";
import { Row } from "@ui/tanstack-table";
import { IoCheckmarkDone } from "react-icons/io5";
import { LuMoreVertical, LuX } from "react-icons/lu";
import { SlMagnifierAdd } from "react-icons/sl";
import { toast } from "sonner";

export const PendingProductDataTableAction = ({ row }: { row: Row<TProduct> }) => {
  const [approve, { isLoading: approveLoading }] = useApproveProductMutation();

  const handleApprove = async () => {
    const toastId = toast.loading("Sending request to approve!", { duration: 3000 });
    try {
      const res = await approve(row.original.id.toString()).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      const appError = handleApiError(error);
      toast.error(appError.message, { id: toastId });
    }
  };
  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant={"link"} size={"sm"} className="flex h-8 w-fit gap-2 border px-3 py-1">
        <SlMagnifierAdd />
        <span>View</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="accent" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <LuMoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[160px]" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={approveLoading} onClick={handleApprove} className="flex gap-2">
            <IoCheckmarkDone color="green" />
            <span>Approve Product</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <LuX color="red" />
            <span>Reject Product</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
