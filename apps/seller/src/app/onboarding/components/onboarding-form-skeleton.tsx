import { Skeleton } from "@ui/index";

const OnboardingFormSkeleton = () => {
  return (
    <div className="mx-auto w-full space-y-5 py-20 md:w-[80%] lg:w-[55%]">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
      <div className="flex justify-between">
        <Skeleton className="h-7 w-1/5 rounded-full" />
        <Skeleton className="h-7 w-1/5 rounded-full" />
        <Skeleton className="h-7 w-1/5 rounded-full" />
      </div>
      <Skeleton className="h-5 w-10" />
      <Skeleton className="h-5 w-20" />
      <hr />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-10 w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-1/6" />
        <Skeleton className="h-7 w-1/6" />
      </div>
    </div>
  );
};

export default OnboardingFormSkeleton;
