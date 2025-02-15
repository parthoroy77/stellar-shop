import { ISubOrder } from "@repo/utils/types";
import { CiDeliveryTruck } from "react-icons/ci";

const ShippingOption = ({ shippingOption }: { shippingOption: ISubOrder["shippingOption"] }) => {
  return (
    <div className="space-y-3">
      <h4 className="font-medium">Shipping Option</h4>
      <div className="flex justify-between">
        <div className="flex items-start gap-2 text-sm tracking-wide">
          <CiDeliveryTruck size={24} />
          <p className="flex flex-col">
            <span className="font-medium">{shippingOption?.name}</span>
            <span className="text-accent-foreground text-xs">Get By {shippingOption?.estimateDays}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingOption;
