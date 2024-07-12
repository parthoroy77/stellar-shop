import { cn } from "@repo/ui/lib/utils";
import { FC } from "react";

interface SideBannerProps {
  image: string;
  heading: string;
  subHeading: string;
  className?: string;
}

const SideBanner: FC<SideBannerProps> = ({ image, heading, className, subHeading }) => {
  return (
    <div
      className={cn(
        "bg-muted-foreground flex h-full items-center justify-between rounded-md *:w-[50%] lg:flex-col lg:items-start *:lg:w-full",
        className
      )}
    >
      <div className="text-accent-foreground space-y-4 p-7 text-xs lg:text-sm">
        <h3 className="text-accent-foreground text-xl font-semibold">{heading}</h3>
        <h6 className="">{subHeading}</h6>
        <h6 className="text-xs">Check All Products</h6>
      </div>
      <img src={image} className="lg:max-w-[180px]" alt="Newly Arrived Banner" />
    </div>
  );
};

export default SideBanner;
