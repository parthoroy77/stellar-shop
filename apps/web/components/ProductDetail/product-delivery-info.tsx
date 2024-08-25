import { CiDeliveryTruck } from "react-icons/ci";
import { GiMoneyStack } from "react-icons/gi";

const ProductDeliveryInfo = () => {
  return (
    <div className="bg-accent/40 divide-y-2 rounded-md border *:p-4">
      <h6 className="text-sm">Delivery Information</h6>
      <div className="flex justify-between">
        <div className="flex items-start gap-2 text-sm tracking-wide">
          <CiDeliveryTruck size={24} />
          <p className="flex flex-col">
            <span>Standard Delivery</span>
            <span className="text-accent-foreground text-xs">Get By 3-7 August</span>
          </p>
        </div>
        <span className="block">$75</span>
      </div>
      <div className="flex justify-between">
        <div className="flex items-start gap-2 text-sm tracking-wide">
          <CiDeliveryTruck size={24} />
          <p className="flex flex-col">
            <span>Express Delivery</span>
            <span className="text-accent-foreground text-xs">Get By Same Day</span>
          </p>
        </div>
        <span className="block">$100</span>
      </div>
      <div className="flex items-center gap-2 text-sm tracking-wide">
        <GiMoneyStack size={24} />
        <p className="flex flex-col">
          <span>Cash On Delivery Available</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDeliveryInfo;
