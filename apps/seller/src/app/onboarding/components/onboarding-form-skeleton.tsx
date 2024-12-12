import { Skeleton } from "@ui/index";

const OnboardingFormSkeleton = () => {
  return (
    <div className="space-y-5">
      <Skeleton className="h-5 w-10" />
      <Skeleton className="h-5 w-20" />
      <hr />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-10 w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
      </div>
    </div>
  );
};

export default OnboardingFormSkeleton;
