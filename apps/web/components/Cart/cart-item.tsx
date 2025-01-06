import { TCartItem } from "@repo/utils/types";
import { Badge, Checkbox } from "@ui/index";
import Image from "next/image";
import { TbCurrencyTaka } from "react-icons/tb";
import CartItemQuantitySelection from "./cart-item-quantity-selection";
import DeleteCartItem from "./delete-cart-item";

type CartItemProps = {
  cartItem: TCartItem;
  onSelect: (checked: boolean) => void;
  isChecked: boolean;
};

const CartItem = ({ cartItem, onSelect, isChecked }: CartItemProps) => {
  const attributes = cartItem.productVariant?.attributes?.map((attr) => ({
    name: attr.attributeValue.value,
  }));

  const price = cartItem.productVariant ? cartItem.productVariant.price : cartItem.product.price || 0;
  return (
    <div className="flex w-full items-center gap-3">
      <Checkbox
        className="data-[state=checked]:bg-primary-foreground"
        checked={isChecked}
        onCheckedChange={(checked) => onSelect(checked as boolean)}
      />
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
              {attributes?.map((attr, idx) => (
                <Badge key={idx} variant={"accent"} className="rounded-md">
                  {attr.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex-row- flex justify-between gap-5 lg:flex-row lg:items-center">
            <CartItemQuantitySelection
              cartItemId={cartItem.id}
              stock={cartItem?.product!.stock!}
              initialQuantity={cartItem.quantity}
            />
            <div className="flex items-center justify-start text-sm font-medium text-black md:min-w-24 lg:justify-center lg:text-lg">
              <TbCurrencyTaka />
              <span>{price}</span>
            </div>
            <div className="flex items-center">
              <DeleteCartItem cartItemId={cartItem.id!} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
