import { toNormalCase } from "@repo/utils/functions";
import { OrderPaymentStatus, TOrderStatus } from "@repo/utils/types";
import { Badge } from "@ui/index";
import moment from "moment";
import { FC } from "react";
interface Props {
  orderId: string;
  placedAt: Date;
  status: TOrderStatus;
  paymentStatus: OrderPaymentStatus;
}
const OrderHeader: FC<Props> = ({ orderId, placedAt, status, paymentStatus }) => {
  return (
    <div className="flex flex-col gap-2 lg:items-center lg:justify-between">
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium lg:text-lg">
          Order ID: <b className="text-secondary">{orderId}</b>
        </h3>
        <p className="space-x-1 text-xs font-medium text-black lg:text-sm">
          <span className="text-accent-foreground font-normal">Date: </span>
          <span>{moment(placedAt).format("MMMM D YYYY")},</span>
          <span>at</span>
          <span>{moment(placedAt).format("h:mm a")}</span>
        </p>
      </div>
      <div className="flex items-end justify-between gap-2 text-xs font-medium lg:flex-col">
        <div className="flex items-center gap-1">
          <span>Order Status:</span>
          <Badge
            variant={status === "CANCELED" ? "destructive" : status === "DELIVERED" ? "success" : "accent"}
            className="rounded-md capitalize"
          >
            {toNormalCase(status).toLowerCase()}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <span>Payment: </span>
          <Badge
            variant={
              paymentStatus === OrderPaymentStatus.PAID
                ? "success"
                : paymentStatus === OrderPaymentStatus.UNPAID
                  ? "destructive"
                  : "accent"
            }
            className="rounded-md capitalize"
          >
            {toNormalCase(paymentStatus).toLowerCase()}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
