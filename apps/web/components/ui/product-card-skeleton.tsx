import { Skeleton } from "@ui/index";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[150px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
