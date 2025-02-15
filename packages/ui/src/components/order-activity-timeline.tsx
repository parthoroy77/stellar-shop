import { toNormalCase } from "@repo/utils/functions";
import { OrderStatus, TOrder } from "@repo/utils/types";
import { cn } from "@ui/lib/utils";
import moment from "moment";

export const OrderActivityTimeline = ({ statusHistory }: { statusHistory: TOrder["orderStatusHistory"] }) => {
  return (
    <div>
      <h4 className="font-medium">Order Activities</h4>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-2.5 top-3 h-[calc(100%-30px)] w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {statusHistory.map((history, index) => (
            <div key={index} className="relative flex gap-4">
              {/* Timeline dot */}
              <div
                className={`bg-accent relative mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full`}
              >
                <div
                  className={cn(
                    "bg-secondary h-2.5 w-2.5 animate-pulse rounded-full",
                    history.status === OrderStatus.DELIVERED && "h-5 w-5 animate-none bg-green-700"
                  )}
                ></div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h3 className="font-medium capitalize text-gray-900 lg:text-base">
                    {toNormalCase(history.status.toLowerCase())}
                  </h3>
                  <p className="text-accent-foreground text-sm">
                    Your order is {toNormalCase(history.status.toLowerCase())}
                  </p>
                </div>
                <p className="text-accent-foreground space-x-1 text-xs font-medium">
                  <span>{moment(history.changedAt).format("D MMMM, YYYY")},</span>
                  <span>at</span>
                  <span>{moment(history.changedAt).format("hh:mm a")}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
