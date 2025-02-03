import { formatAttributes } from "@/utils/product-utils";
import { TPackage } from "@repo/utils/types";
import { AppButton, RadioGroup, RadioGroupItem } from "@ui/index";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";

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

const PackagedProductCard = ({ quantity, images, productName, price, variant, attributes }: TPackage["items"][0]) => {
  const finalPrice = variant ? variant.price : price;
  const simplifiedAttributes = formatAttributes(variant ? (variant.attributes as any) : attributes).flatMap(
    (attr) => attr.attributeValues
  );
  return (
    <div className="bg-accent/30 flex w-full items-start justify-between gap-2 rounded-md border px-2 py-2 lg:items-center lg:py-1">
      <Image
        width={60}
        height={60}
        className="rounded-md border"
        src={images![0]?.file.fileSecureUrl!}
        alt={productName || "product name"}
      />
      <div className="flex-1 space-y-1">
        <h5 className="w-full truncate text-sm font-medium">{productName}</h5>
        <div className="flex w-full flex-col justify-between gap-1 lg:flex-row lg:items-center lg:gap-2">
          {!!simplifiedAttributes.length && (
            <div className="w-full space-x-2">
              {simplifiedAttributes.map((attr, idx) => (
                <span key={idx} className="rounded-md border bg-white px-1.5 py-0.5 text-xs">
                  {attr?.value}
                </span>
              ))}
            </div>
          )}
          <div className="flex w-full items-center justify-between gap-5">
            <div className="flex items-center justify-start gap-1 text-xs font-medium text-black lg:justify-center">
              <span>Qty: </span>
              <span> {quantity}</span>
            </div>
            <div className="flex items-center justify-start text-sm font-medium text-black md:min-w-24 lg:justify-center lg:text-sm">
              <TbCurrencyTaka />
              <span>{finalPrice}</span>
            </div>
            <div className="flex items-center">
              <AppButton variant={"destructive"} size={"sm"} className="h-fit w-fit border p-1">
                <RiDeleteBinLine size={15} />
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPackages;
