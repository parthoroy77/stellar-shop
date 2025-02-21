import { Skeleton } from "@ui/index";
import { cn } from "@ui/lib/utils";

const OrderCardSkeleton = () => {
  return (
    <div className={cn("w-full rounded-md border p-2 sm:p-4")}>
      <div className="flex flex-col justify-between gap-2 pb-3 lg:flex-row lg:items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-72" />
            <Skeleton className="h-7 w-44" />
          </div>
          <Skeleton className="h-7 w-32" />
        </div>
        <div className="flex items-center">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <div className="space-y-1 sm:space-y-3">
        {Array.from({ length: 2 }).map((_x, i) => (
          <div key={i} className="space-y-1 rounded-xl border bg-white px-2 py-1.5 sm:space-y-3 sm:px-4 sm:py-3">
            {/* Seller Information */}
            <div className="flex flex-col items-start sm:flex-row lg:items-center lg:justify-between">
              <Skeleton className="h-7 w-20" />
              <div className="flex cursor-pointer items-center justify-end gap-2">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-7 w-32" />
              </div>
            </div>
            {/* Items from this seller */}
            <div className="grid gap-3 lg:grid-cols-2">
              {Array.from({ length: 2 }).map((_x, i) => (
                <div key={i} className="flex w-full items-start justify-between gap-2 rounded-lg border p-1.5">
                  <Skeleton className="size-[55px] rounded-sm border" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-7 w-2/3" />
                    <div className="flex w-full flex-wrap items-center justify-between gap-3 lg:justify-between">
                      <Skeleton className="h-7 w-16" />
                      <Skeleton className="h-7 w-20" />
                      <Skeleton className="h-7 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
