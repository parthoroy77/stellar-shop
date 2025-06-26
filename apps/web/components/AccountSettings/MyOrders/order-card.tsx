import { toNormalCase } from "@repo/utils/functions";
import { TOrder } from "@repo/utils/types";
import { Badge, Button } from "@ui/index";
import { cn } from "@ui/lib/utils";
import moment from "moment";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import OrderItemCard from "./order-item-card";
import OrderSellerInformation from "./order-seller-information";

const OrderCard = ({ order }: { order: TOrder }) => {
  return (
    <div className={cn("bg-accent/30 w-full rounded-md border p-2 sm:p-4")}>
      <div className="flex flex-col justify-between gap-2 pb-3 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-medium lg:text-lg">
              Order ID: <b className="text-secondary">{order.uniqueId}</b>
            </h3>
            <Badge
              variant={
                order.status === "CANCELED" ? "destructive" : order.status === "DELIVERED" ? "success" : "accent"
              }
              className="rounded-md capitalize"
            >
              {toNormalCase(order.status).toLowerCase()}
            </Badge>
          </div>
          <p className="space-x-1 text-xs font-medium text-black lg:text-sm">
            <span className="text-accent-foreground font-normal">Date: </span>
            <span>{moment(order.orderPlacedAt).format("MMMM D YYYY")},</span>
            <span>at</span>
            <span>{moment(order.orderPlacedAt).format("h:mm a")}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={"/my-orders/" + order.id}>
            <Button className="space-x-1 border" variant={"outline"}>
              <span>View Details</span>
              <GoArrowUpRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-1 divide-y sm:space-y-3">
        {order.subOrders.map((subOrder, i) => (
          <div
            key={subOrder.id}
            className="space-y-1 rounded-xl border bg-white px-2 py-1.5 sm:space-y-3 sm:px-4 sm:py-3"
          >
            {/* Seller Information */}
            <OrderSellerInformation status={subOrder.status} seller={subOrder.seller} packageNumber={i + 1} />
            {/* Items from this seller */}
            <div className="grid gap-3 lg:grid-cols-2">
              {subOrder.subOrderItems.map((item, i) => (
                <OrderItemCard item={item} key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
