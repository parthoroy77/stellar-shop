import { Progress } from "@ui/index";
import { BsBoxSeam } from "react-icons/bs";

type FreeShippingBannerProps = {
  currentTotal: number;
  freeShippingThreshold: number;
};

const FreeShippingBanner = ({ currentTotal, freeShippingThreshold }: FreeShippingBannerProps) => {
  const remaining = freeShippingThreshold - currentTotal;
  const progress = Math.min((currentTotal / freeShippingThreshold) * 100, 100);

  return (
    <div className="bg-accent/40 flex flex-col justify-center gap-3 rounded-md px-6 py-4">
      <div className="flex items-center gap-4 text-sm font-medium">
        <BsBoxSeam size={18} />
        <span>
          {remaining > 0
            ? `Add $${remaining.toFixed(2)} to cart and get free shipping!`
            : "You qualify for free shipping!"}
        </span>
      </div>
      <Progress value={progress} className="h-[3.5px]" />
    </div>
  );
};

export default FreeShippingBanner;
