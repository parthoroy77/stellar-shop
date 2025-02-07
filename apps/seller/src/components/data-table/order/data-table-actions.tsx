"use client";
import { TSubOrder, updateOrderStatus } from "@/actions/order.action";
import { useQueryClient } from "@repo/tanstack-query";
import { SubOrderStatus } from "@repo/utils/types";
import { Button } from "@ui/index";
import { Row } from "@ui/tanstack-table";
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
      <Button size={"sm"} className="flex h-7 w-fit gap-1" variant={"link"}>
        <SlMagnifierAdd />
        View
      </Button>
      {row.original.status === SubOrderStatus.PROCESSING && (
        <Button
          onClick={() => handleStatus(SubOrderStatus.CONFIRMED)}
          size={"sm"}
          className="h-7 w-fit min-w-16 border"
          variant={"accent"}
        >
          Confirm Order
        </Button>
      )}
      {row.original.status === SubOrderStatus.CONFIRMED && (
        <Button
          onClick={() => handleStatus(SubOrderStatus.PACKED)}
          size={"sm"}
          className="h-7 w-fit min-w-16 border"
          variant={"accent"}
        >
          Ready to ship
        </Button>
      )}
      {row.original.status === SubOrderStatus.PACKED && (
        <Button
          onClick={() => handleStatus(SubOrderStatus.SHIPPED)}
          size={"sm"}
          className="h-7 w-fit min-w-16 border"
          variant={"accent"}
        >
          Product Shipped
        </Button>
      )}
    </div>
  );
};

export default OrderDataTableActions;
