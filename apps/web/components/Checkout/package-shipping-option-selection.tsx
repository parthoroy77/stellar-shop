"use client";
import { updateUserCheckoutData } from "@/actions/checkout";
import { TPackage } from "@repo/utils/types";
import { RadioGroup, RadioGroupItem } from "@ui/index";

const PackageShippingOptionSelection = ({
  shippingOptions,
  selectedOption,
  sellerId,
}: {
  shippingOptions: TPackage["shippingOptions"];
  selectedOption: number | null;
  sellerId: number;
}) => {
  const handleUpdate = async (value: string) => {
    await updateUserCheckoutData({
      type: "shippingOptionUpdate",
      shippingOption: {
        sellerId,
        shippingOptionId: +value,
      },
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium">Available Shipping Option</span>
      <RadioGroup
        onValueChange={handleUpdate}
        defaultValue={selectedOption?.toString()}
        className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
      >
        {shippingOptions.map(({ id, name, charge, estimateDays }) => (
          <div key={id} className="flex items-start gap-2 rounded-md border px-3 py-1.5">
            <RadioGroupItem value={id!.toString()} id={id!.toString()} className="mt-1" />
            <div className="text-accent-foreground w-full space-y-1 text-sm">
              <h5 className="text-primary-foreground text-sm font-semibold">{name}</h5>
              <div className="flex justify-between text-xs font-medium">
                <span>
                  Cost: <b>${charge}</b>
                </span>
                <span>
                  Estimated Days: <b>{estimateDays}</b>
                </span>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PackageShippingOptionSelection;
