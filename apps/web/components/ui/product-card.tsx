import { Badge } from "@repo/ui";
import { TProduct } from "@repo/utils/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { GoStarFill } from "react-icons/go";
import { HiArrowPath } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import AddToCartButton from "./add-to-cart-button";
import ToggleWishlistButton from "./toggle-wishlist-button";
import TooltipComponent from "./tooltip-component";
interface Props {
  product: TProduct;
}
const ProductCard: FC<Props> = ({ product }) => {
  const { id, price, productName, urlSlug, images, comparePrice } = product;
  const avgDiscount = Math.round(((comparePrice - price) / comparePrice) * 100);
  return (
    // Link to the product page
    <Link href={`/products/${urlSlug}`}>
      <div className="group relative flex flex-col justify-between divide-y rounded-md border duration-300 *:p-2 md:*:p-3">
        {/* Product Image */}
        <div className="relative flex w-full justify-center bg-white">
          <Image
            width={100}
            height={100}
            className="aspect-square h-[200px] w-full object-contain lg:h-[150px]"
            src={images[0]?.file.fileSecureUrl!}
            alt={productName + " " + "Image"}
          />
        </div>
        <div className="absolute right-0 top-0 flex flex-col gap-1 text-xs opacity-100 duration-300 group-hover:visible group-hover:opacity-100 md:text-sm lg:invisible lg:text-xl lg:opacity-0">
          <ToggleWishlistButton productId={id} />
          <TooltipComponent tooltipContent="Add To Compare">
            <span className="bg-muted-foreground flex size-8 items-center justify-center rounded-full p-0 text-xl text-black">
              <HiArrowPath aria-label="Compare" />
            </span>
          </TooltipComponent>
          <TooltipComponent tooltipContent="Quick Overview">
            <span className="bg-muted-foreground flex size-8 items-center justify-center rounded-full p-0 text-xl text-black">
              <IoEyeOutline aria-label="Quick Overview" />
            </span>
          </TooltipComponent>
        </div>

        {/* Product Information (Name, Stock, Rating, Sold count) */}
        <div className="flex flex-col space-y-2 md:h-[120px]">
          <h5 className="line-clamp-2 text-sm font-medium">{productName}</h5>

          {/* Stock, Rating, and Sold Badges */}
          <div className="flex flex-wrap gap-1 md:items-center md:gap-0">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <GoStarFill key={index} className="inline-block text-yellow-500" />
              ))}
            </div>
            <span className="text-xs">4.3 / (100)</span>
          </div>

          <div className="flex flex-wrap justify-between gap-2">
            {/* In Stock Badge */}
            <Badge variant={"success"} className="rounded-md text-xs uppercase">
              In Stock
            </Badge>

            {/* Sold Count Badge */}
            <Badge variant={"accent"} className="rounded-sm">
              200 Sold
            </Badge>
          </div>
        </div>

        {/* Price and Add to Cart Button */}
        <div className="flex flex-row items-center justify-between gap-2">
          {/* Price section */}
          <p className="flex w-1/2 items-end gap-1 truncate border-b border-b-white text-xs font-medium">
            <span className="text-primary p-0 text-base font-semibold !leading-[1rem] lg:text-xl">${price}</span>
            <span className="w-28 truncate !leading-[0.65rem] text-gray-400 line-through">${comparePrice}</span>
          </p>

          {/* Add to Cart Button */}
          <AddToCartButton productId={id} />
        </div>

        {/* Discount Label (7% Off) */}
        <span className="text-muted-foreground absolute left-1 top-1 rounded-md bg-green-800 !px-2 !py-1 text-xs font-semibold uppercase">
          {avgDiscount}% Off
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
