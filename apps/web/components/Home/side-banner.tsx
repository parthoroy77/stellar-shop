import { cn } from "@repo/ui/lib/utils";
import Image from "next/image";
import { FC } from "react";

interface SideBannerProps {
  image?: string;
  heading: string;
  subHeading: string;
  className?: string;
  textBlur?: boolean;
}

const SideBanner: FC<SideBannerProps> = ({ image, textBlur = true, heading, className, subHeading }) => {
  return (
    <div
      className={cn(
        "bg-muted-foreground text-accent-foreground flex items-center justify-between overflow-hidden rounded-md lg:h-full lg:flex-col lg:items-start *:lg:w-full",
        className
      )}
    >
      <div
        className={cn(
          "flex-1 space-y-4 p-7 text-xs lg:flex-none lg:text-sm",
          textBlur && "backdrop-blur-sm lg:backdrop-blur-lg"
        )}
      >
        <h3 className="text-xl font-semibold">{heading}</h3>
        <h5 className="">{subHeading}</h5>
        <h5 className="text-xs">Check All Products</h5>
      </div>
      {image && (
        <Image height={400} width={300} src={image} className="w-[50%] lg:max-w-[180px]" alt={`${heading} Image`} />
      )}
    </div>
  );
};

export default SideBanner;
