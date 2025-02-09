import { useUpdateOrderStatusMutation } from "@repo/redux";
import { TOrderStatus } from "@repo/utils/types";
import { Button } from "@ui/index";
import { Row } from "@ui/tanstack-table";
import { SlMagnifierAdd } from "react-icons/sl";
import { toast } from "sonner";
import { TOrderResponse } from "./column";

const OrdersDataTableActions = ({ row }: { row: Row<TOrderResponse> }) => {
  const status = row.original.status;
  return (
    <div className="flex w-fit justify-center gap-1">
      <Button size={"sm"} className="flex h-7 w-fit gap-1" variant={"link"}>
        <SlMagnifierAdd />
        View
      </Button>
      <OrderStatusUpdate currentStatus={status} orderId={row.original.id} />
    </div>
  );
};

const OrderStatusUpdate = ({ orderId, currentStatus }: { orderId: number; currentStatus: TOrderStatus }) => {
  const [updateStatus] = useUpdateOrderStatusMutation();
  const handleStatus = async (status: TOrderStatus) => {
    const result = await updateStatus({ orderId, status }).unwrap();
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  return (
    <>
      {currentStatus === "SHIPPED" && (
        <Button
          onClick={() => handleStatus("IN_TRANSIT")}
          size={"sm"}
          className="h-7 w-fit min-w-16 border"
          variant={"accent"}
        >
          Order In Transit
        </Button>
      )}
      {currentStatus === "IN_TRANSIT" && (
        <Button
          onClick={() => handleStatus("OUT_FOR_DELIVERY")}
          size={"sm"}
          className="h-7 w-fit min-w-16 border"
          variant={"accent"}
        >
          Out For Delivery
        </Button>
      )}
      {currentStatus === "OUT_FOR_DELIVERY" && (
        <Button
          onClick={() => handleStatus("DELIVERED")}
          size={"sm"}
          className="h-7 w-fit min-w-16 border"
          variant={"accent"}
        >
          Order Delivered
        </Button>
      )}
      {currentStatus === "OUT_FOR_DELIVERY" && (
        <Button
          onClick={() => handleStatus("DELIVERY_FAILED")}
          size={"sm"}
          className="h-7 w-fit min-w-16 border"
          variant={"accent"}
        >
          Delivery Failed
        </Button>
      )}
    </>
  );
};

export default OrdersDataTableActions;
