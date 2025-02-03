import { TPackage } from "@repo/utils/types";
import { RadioGroup, RadioGroupItem } from "@ui/index";
import Image from "next/image";
import PackagedProductCard from "./packaged-product-card";

const ProductPackages = ({ packages }: { packages: TPackage[] }) => {
  return (
    <div className="space-y-1.5">
      <h3 className="text-primary-foreground text-lg font-medium">Total Package Packages {packages?.length}</h3>
      {packages.map(({ shopName, logo, items, selectedShippingOption, shippingOptions }, i) => (
        <div key={i} className="space-y-4 rounded-lg border bg-white p-3.5">
          <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
            <h4 className="font-medium">Package {i + 1}</h4>
            <div className="flex items-center justify-end gap-2">
              <h6 className="text-accent-foreground text-xs font-medium">Seller & Shipped By</h6>
              <div className="flex items-center gap-1">
                <Image
                  width={20}
                  height={20}
                  alt={"groupedItem.seller.shopName"}
                  src={
                    logo.fileSecureUrl ||
                    "https://res.cloudinary.com/dx0iiqjf4/image/upload/v1735808264/shopMedia/nrpn006yyxcdjm8skkzn.png"
                  }
                />
                <h5 className="text-primary-foreground text-sm font-semibold">{shopName}</h5>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium">Available Shipping Option</span>
            <RadioGroup
              defaultValue={selectedShippingOption?.toString()}
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
          <div className="grid gap-3 lg:grid-cols-2">
            {items.map((product, i) => {
              return <PackagedProductCard key={i} {...product} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPackages;
