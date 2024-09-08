import { Skeleton } from "@ui/index";

const SideFiltersSkeleton = () => {
  return (
    <div className="flex h-fit w-[20%] flex-col space-y-3 divide-y rounded-md border *:px-6 *:py-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="flex flex-col space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideFiltersSkeleton;
