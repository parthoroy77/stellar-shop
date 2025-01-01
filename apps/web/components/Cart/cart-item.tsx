import { TCartItem } from "@repo/utils/types";
import { AppButton, Badge } from "@ui/index";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import ProductQuantitySelection from "../ProductDetail/product-quantity-selection";

type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const attributes = cartItem.productVariant?.attributes?.map((attr) => ({
    name: attr.attributeValue.value,
  }));
  return (
    <div className="flex w-full items-start justify-between gap-3 lg:items-center">
      <Image
        width={70}
        height={70}
        className="size-[70px] rounded-md border"
        src={cartItem!.product!.images![0]?.file.fileSecureUrl! as string}
        alt={cartItem!.product!.productName!}
      />
      <div className="flex w-full flex-col justify-between gap-2 lg:flex-row lg:items-center">
        <div className="w-full space-y-1">
          <h5 className="truncate text-sm font-medium">{cartItem!.product!.productName!}</h5>
          <div className="space-x-2">
            {attributes?.map((attr) => (
              <Badge variant={"accent"} className="rounded-md">
                {attr.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex-row- flex justify-between gap-5 lg:flex-row lg:items-center">
          <ProductQuantitySelection
            className="h-fit w-[120px] flex-row-reverse lg:min-w-[150px]"
            buttonClass="text-xs lg:p-2 p-1 lg:text-sm"
            labelClass="text-xs"
            stock={cartItem?.product!.stock!}
            initialQuantity={cartItem.quantity}
          />
          <div className="flex items-center justify-start text-sm font-medium text-black md:min-w-24 lg:justify-center lg:text-lg">
            <TbCurrencyTaka />
            <span>{cartItem!.product!.price!}</span>
          </div>
          <div className="flex items-center">
            <AppButton variant={"accent"} size={"sm"} className="h-fit w-fit border p-1 lg:p-2">
              <RiDeleteBinLine className="text-sm lg:text-xl" />
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
