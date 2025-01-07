import { Skeleton } from "@ui/index";

const ShippingAddressCardSkeleton = () => {
  return (
    <div className="relative space-y-3 rounded-lg border bg-white px-5 py-4 transition-all duration-300">
      <div className="text-accent-foreground cursor-pointer space-y-2">
        {/* Badge Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>

        {/* Name Skeleton */}
        <Skeleton className="h-5 w-2/3 rounded-md" />

        {/* Address and State Skeleton */}

        {/* City and Country Skeleton */}
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
      </div>
    </div>
  );
};

export default ShippingAddressCardSkeleton;
