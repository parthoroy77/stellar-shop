import { TProductShippingOption } from "@repo/utils/types";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiMoneyStack } from "react-icons/gi";

const ProductShippingInfo = ({ shippingOptions }: { shippingOptions: Partial<TProductShippingOption>[] }) => {
  return (
    <div className="bg-accent/40 divide-y-2 rounded-md border *:p-4">
      <h6 className="text-accent-foreground font-medium">Shipping Options</h6>
      {shippingOptions.map((op, i) => (
        <div key={i} className="flex justify-between">
          <div className="flex items-start gap-2 text-sm tracking-wide">
            <CiDeliveryTruck size={24} />
            <p className="flex flex-col">
              <span className="font-medium">{op?.option?.name}</span>
              <span className="text-accent-foreground text-xs">Get By {op?.option?.estimateDays}</span>
            </p>
          </div>
          <span className="block font-bold">${op?.option?.charge}</span>
        </div>
      ))}

      <div className="flex items-center gap-2 text-sm tracking-wide">
        <GiMoneyStack size={24} />
        <p className="flex flex-col">
          <span>Cash On Delivery Available</span>
        </p>
      </div>
    </div>
  );
};

export default ProductShippingInfo;
