import { formatAttributes } from "@/utils/product-utils";
import { TPackage } from "@repo/utils/types";
import { AppButton } from "@ui/index";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";

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

export default PackagedProductCard;
