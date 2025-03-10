import { ISubOrderItem, TProduct } from "@repo/utils/types";
import { Badge } from "@ui/index";
import Image from "next/image";
import { TbCurrencyTaka } from "react-icons/tb";

const OrderItemCard = ({ item }: { item: ISubOrderItem }) => {
  const simplifiedAttributes = (item.attributes as TProduct["attributes"])?.map((attr) => ({
    name: attr.attributeValue.value,
  }));
  return (
    <div className="bg-accent/30 flex w-full items-start justify-between gap-2 rounded-lg border p-1.5">
      <Image
        width={55}
        height={55}
        className="size-[55px] rounded-sm border"
        src={
          item?.product?.images[0]?.file.fileSecureUrl ||
          "https://res.cloudinary.com/dx0iiqjf4/image/upload/v1735808264/shopMedia/nrpn006yyxcdjm8skkzn.png"
        }
        alt={item.productName || "product name"}
      />
      <div className="flex-1 space-y-1">
        <h5 className="w-60 truncate text-xs font-medium sm:text-sm lg:w-72">{item.productName}</h5>
        <div className="flex w-full flex-wrap items-center justify-between gap-3 lg:justify-between">
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
          <div className="flex items-center justify-start gap-1 text-xs font-medium text-black lg:justify-center">
            <span>Quantity: </span>
            <span> {item.quantity}</span>
          </div>
          <div className="text-primary flex items-center justify-start text-sm font-semibold lg:justify-center lg:text-base">
            <TbCurrencyTaka />
            <span>{item.totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
