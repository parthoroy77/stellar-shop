import { TPackage } from "@repo/utils/types";
import Image from "next/image";
import PackageShippingOptionSelection from "./package-shipping-option-selection";
import PackagedProductCard from "./packaged-product-card";

const ProductPackages = ({ packages }: { packages: TPackage[] }) => {
  return (
    <div className="space-y-1.5">
      <h3 className="text-primary-foreground text-lg font-medium">Total Package Packages {packages?.length}</h3>
      {packages.map(({ shopName, logo, items, sellerId, selectedShippingOption, shippingOptions }, i) => (
        <div key={i} className="space-y-4 rounded-lg border bg-white p-3.5">
          {/* Seller Details of this package */}
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
          {/* Shipping Option */}
          <PackageShippingOptionSelection
            sellerId={sellerId}
            selectedOption={selectedShippingOption}
            shippingOptions={shippingOptions}
          />
          {/* Products in package */}
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
