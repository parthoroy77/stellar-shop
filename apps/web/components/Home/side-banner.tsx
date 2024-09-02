import { cn } from "@repo/ui/lib/utils";
import Image from "next/image";
import { FC } from "react";

interface SideBannerProps {
  image?: string;
  heading: string;
  subHeading: string;
  className?: string;
}

const SideBanner: FC<SideBannerProps> = ({ image, heading, className, subHeading }) => {
  return (
    <div
      className={cn(
        "bg-muted-foreground text-accent-foreground flex h-full items-center justify-between rounded-md *:w-[50%] lg:flex-col lg:items-start *:lg:w-full",
        className
      )}
    >
      <div className="space-y-4 p-7 text-xs lg:text-sm">
        <h3 className="text-xl font-semibold">{heading}</h3>
        <h5 className="">{subHeading}</h5>
        <h5 className="text-xs">Check All Products</h5>
      </div>
      {image && <Image height={400} width={300} src={image} className="lg:max-w-[180px]" alt={`${heading} Image`} />}
    </div>
  );
};

export default SideBanner;
