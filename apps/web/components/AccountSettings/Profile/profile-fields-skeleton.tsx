import { Skeleton } from "@ui/index";

const ProfileFieldsSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-3 space-y-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="col-span-7 grid grid-cols-2 gap-3">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="col-span-2 flex justify-end gap-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};

export default ProfileFieldsSkeleton;
