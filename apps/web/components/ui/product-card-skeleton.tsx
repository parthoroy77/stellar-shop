import { Skeleton } from "@ui/index";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col divide-y overflow-hidden rounded-md border *:p-2 md:*:p-3">
      <Skeleton className="h-[150px] w-full rounded-none" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
      <div className="flex items-center justify-between gap-5">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
