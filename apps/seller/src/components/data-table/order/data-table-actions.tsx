"use client";
import { TSubOrder, updateOrderStatus } from "@/actions/order.action";
import { useQueryClient } from "@repo/tanstack-query";
import { SubOrderStatus } from "@repo/utils/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@ui/index";
import { Row } from "@ui/tanstack-table";
import Link from "next/link";
import { SlMagnifierAdd } from "react-icons/sl";
import { toast } from "sonner";

const OrderDataTableActions = ({ row }: { row: Row<TSubOrder> }) => {
  const queryClient = useQueryClient();
  const handleStatus = async (status: SubOrderStatus) => {
    const result = await updateOrderStatus(row.original.id, status);
    if (result.success) {
      toast.success(result.message);
      await queryClient.invalidateQueries({ predicate: (queryKey) => queryKey.queryKey[0] === "orders" });
    } else {
      toast.error(result.message);
    }
  };
  return (
    <div className="flex w-fit justify-center gap-1">
      <Link href={`/orders/${row.original.id}`}>
        <Button size={"sm"} className="flex h-7 w-fit gap-1" variant={"link"}>
          <SlMagnifierAdd />
          View
        </Button>
      </Link>
      {row.original.status === SubOrderStatus.PROCESSING && (
        <>
          <Button
            onClick={() => handleStatus(SubOrderStatus.CONFIRMED)}
            size={"sm"}
            className="h-7 w-fit min-w-16 border"
            variant={"accent"}
          >
            Confirm Order
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={"sm"} className="h-7 w-fit min-w-16 border" variant={"destructive"}>
                Cancel Order
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure to cancel this order?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently cancel your incoming order!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleStatus(SubOrderStatus.CANCELED)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
      {row.original.status === SubOrderStatus.CONFIRMED && (
        <Button
          onClick={() => handleStatus(SubOrderStatus.PACKED)}
          size={"sm"}
          className="h-7 w-fit min-w-16 border"
          variant={"accent"}
        >
          Product is packed
        </Button>
      )}
      {row.original.status === SubOrderStatus.PACKED && (
        <Button
          onClick={() => handleStatus(SubOrderStatus.SHIPPED)}
          size={"sm"}
          className="h-7 w-fit min-w-16 border"
          variant={"accent"}
        >
          Ready to ship
        </Button>
      )}
    </div>
  );
};

export default OrderDataTableActions;
