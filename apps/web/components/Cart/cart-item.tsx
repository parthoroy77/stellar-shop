import { TProduct } from "@repo/utils/types";
import { Checkbox } from "@ui/index";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TbCurrencyTaka } from "react-icons/tb";

type CartItemProps = {
  product: TProduct;
};

const CartItem = ({ product }: CartItemProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-4 lg:items-center lg:px-6 lg:py-3">
      <Checkbox className="size-5 lg:size-4" />
      <div className="flex w-full items-start justify-between gap-3 lg:items-center">
        <Image
          width={70}
          height={70}
          className="size-[70px] rounded-md border"
          src={product.images[0]?.fileUrl as string}
          alt={product.productName}
        />
        <div className="flex w-full flex-col justify-between gap-2 lg:flex-row lg:items-center">
          <h5 className="text-sm font-medium lg:w-[65%]">{product.productName}</h5>
          <div className="flex flex-row-reverse justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex md:min-w-24 items-center gap-5 rounded-md border p-2 text-xs">
              <button>
                <AiOutlineMinus size={14} />
              </button>
              <span>Add</span>
              <button>
                <AiOutlinePlus size={14} />
              </button>
            </div>
            <div className="flex md:min-w-24 items-center justify-start text-sm font-medium text-black lg:justify-center">
              <TbCurrencyTaka />
              <span>{product.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
