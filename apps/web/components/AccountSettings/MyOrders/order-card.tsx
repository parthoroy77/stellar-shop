import { toNormalCase } from "@repo/utils/functions";
import { TOrder } from "@repo/utils/types";
import { Badge, Button } from "@ui/index";
import { cn } from "@ui/lib/utils";
import moment from "moment";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import OrderItemCard from "./order-item-card";

const OrderCard = ({ order }: { order: TOrder }) => {
  return (
    <div className={cn("bg-accent/30 w-full rounded-md border p-4")}>
      <div className="flex flex-col gap-2 pb-3 lg:flex-row lg:items-center lg:justify-between">
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
        <div className="flex items-center">
          <Button className="space-x-1" variant={"link"}>
            <span>View Details</span>
            <GoArrowUpRight size={16} />
          </Button>
        </div>
      </div>
      <div className="space-y-3 divide-y">
        {order.subOrders.map((subOrder, i) => (
          <div key={subOrder.id} className="space-y-3 rounded-xl border bg-white px-4 py-3">
            {/* Seller Information */}
            <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
              <h4 className="font-medium">Package {i + 1}</h4>
              <div className="flex cursor-pointer items-center justify-end gap-2">
                <h6 className="text-accent-foreground text-xs font-medium">Seller & Shipped By</h6>
                <div className="flex items-center gap-1">
                  <Image
                    width={20}
                    height={20}
                    alt={"groupedItem.seller.shopName"}
                    src={
                      subOrder.seller.logo.fileSecureUrl ||
                      "https://res.cloudinary.com/dx0iiqjf4/image/upload/v1735808264/shopMedia/nrpn006yyxcdjm8skkzn.png"
                    }
                  />
                  <h5 className="text-primary-foreground text-sm font-semibold">{subOrder.seller.shopName}</h5>
                </div>
              </div>
            </div>
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
