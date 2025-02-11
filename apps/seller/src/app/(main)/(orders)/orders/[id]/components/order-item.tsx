import { ISubOrderItem, TProduct } from "@repo/utils/types";
import { Badge } from "@ui/index";
import Image from "next/image";
import { TbCurrencyTaka } from "react-icons/tb";

const OrderItem = ({ item }: { item: ISubOrderItem }) => {
  const { attributes, productName, product, productVariant, productVariantId, price, quantity } = item;
  const image = productVariantId
    ? productVariant.images[0]?.file?.fileSecureUrl
    : product.images[0]?.file?.fileSecureUrl;
  const simplifiedAttributes = (attributes as TProduct["attributes"])?.map((attr) => ({
    name: attr.attributeValue.value,
  }));
  console.log(attributes);
  return (
    <div className="flex w-full items-start justify-between gap-3 lg:items-center">
      <Image
        width={50}
        height={50}
        className="size-[50px] rounded-md border object-cover"
        src={image as string}
        alt={productName}
      />
      <div className="flex w-full flex-col justify-between gap-2 lg:flex-row lg:items-end">
        <div className="w-full space-y-1">
          <h5 className="w-[16rem] truncate text-sm font-medium lg:w-[24rem]">{productName}</h5>
          <div className="space-x-2">
            {simplifiedAttributes.length > 0 ? (
              simplifiedAttributes?.map((attr, idx) => (
                <Badge key={idx} variant={"accent"} className="rounded-md">
                  {attr.name}
                </Badge>
              ))
            ) : (
              <div className="text-accent-foreground text-xs font-medium">
                <span>No Attributes</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex items-center gap-2 text-xs font-medium">
            <span>Quantity:</span>
            <span className="text-sm">{quantity}x</span>
          </div>
          <div className="text-primary flex items-center justify-start text-sm font-semibold md:min-w-24 lg:justify-center lg:text-lg">
            <TbCurrencyTaka />
            <span>{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
