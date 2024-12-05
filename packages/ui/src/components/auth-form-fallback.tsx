import { OrDivider } from "./ui/or-divider";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

const AuthFormFallback = () => {
  return (
    <div className="space-y-5">
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-9 w-full" />
      <OrDivider />
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="h-9 w-[300px]" />
        <Skeleton className="h-9 w-[300px]" />
      </div>
      <Separator />
      <Skeleton className="h-5 w-full" />
    </div>
  );
};

export default AuthFormFallback;
