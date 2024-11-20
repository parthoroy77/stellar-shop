import { TProduct } from "@repo/utils/types";
import { AppButton, Checkbox } from "@ui/index";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import ProductQuantitySelection from "../ProductDetail/product-quantity-selection";

type CartItemProps = {
  product: TProduct;
};

const CartItem = ({ product }: CartItemProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-4 lg:items-center lg:px-6 lg:py-3">
      <Checkbox className="size-5 lg:size-4" />
      <div className="flex w-full items-center justify-between gap-3 lg:items-center">
        <Image
          width={70}
          height={70}
          className="size-[70px] rounded-md border"
          src={product.images[0]?.fileUrl as string}
          alt={product.productName}
        />
        <div className="flex w-full flex-col justify-between gap-2 lg:flex-row lg:items-center">
          <h5 className="text-sm font-medium lg:w-[65%]">{product.productName}</h5>
          <div className="flex-row- flex justify-between gap-5 lg:flex-row lg:items-center">
            <ProductQuantitySelection
              className="h-fit w-[120px] flex-row-reverse lg:min-w-[150px]"
              buttonClass="text-xs lg:p-2 p-1 lg:text-sm"
              labelClass="text-xs"
              stock={30}
              initialQuantity={0}
            />
            <div className="flex items-center justify-start text-sm font-medium text-black md:min-w-24 lg:justify-center lg:text-lg">
              <TbCurrencyTaka />
              <span>{product.price}</span>
            </div>
            <div className="flex items-center">
              <AppButton variant={"accent"} size={"sm"} className="h-fit w-fit border p-1 lg:p-2">
                <RiDeleteBinLine className="text-sm lg:text-xl" />
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
