import { cn } from "@ui/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-accent animate-pulse rounded-md", className)} {...props} />;
}

export { Skeleton };
