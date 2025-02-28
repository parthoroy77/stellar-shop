import AddReviewModalForm from "@/components/Forms/add-review-modal-form";
import { toNormalCase } from "@repo/utils/functions";
import { TOrder } from "@repo/utils/types";
import { Badge, Button } from "@ui/index";
import { cn } from "@ui/lib/utils";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import OrderItemCard from "./order-item-card";

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
          {order.status === "DELIVERED" && <AddReviewModalForm />}
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
            <div className="flex flex-col items-start sm:flex-row lg:items-center lg:justify-between">
              <span className="text-xs font-medium sm:text-base">Package {i + 1}</span>
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
                  <span className="text-primary-foreground text-xs font-semibold sm:text-sm">
                    {subOrder.seller.shopName}
                  </span>
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
