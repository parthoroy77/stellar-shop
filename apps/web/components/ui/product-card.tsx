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
            className="aspect-square h-[110px] w-full object-contain lg:h-[150px]"
            src={images[0]?.file.fileSecureUrl!}
            alt={productName + " " + "Image"}
          />
        </div>
        <div className="visible absolute right-0 top-0 flex flex-col gap-1 text-xs opacity-100 duration-300 group-hover:visible group-hover:opacity-100 md:text-sm lg:invisible lg:text-xl lg:opacity-0">
          <ToggleWishlistButton productId={id} />
          <TooltipComponent tooltipContent="Add To Compare">
            <span className="bg-muted-foreground flex size-5 items-center justify-center rounded-full md:size-6 lg:size-8">
              <HiArrowPath aria-label="Compare" />
            </span>
          </TooltipComponent>
          <TooltipComponent tooltipContent="Quick Overview">
            <span className="bg-muted-foreground flex size-5 items-center justify-center rounded-full md:size-6 lg:size-8">
              <IoEyeOutline aria-label="Quick Overview" />
            </span>
          </TooltipComponent>
        </div>
        {/* Quick action icons (Wishlist, Compare, Quick Overview) */}
        {/* <div className="hidden items-center justify-center gap-5 text-lg *:cursor-pointer lg:flex">
          <TooltipComponent tooltipContent="Add To Wishlist">
            <SlHeart aria-label="Wishlist" />
          </TooltipComponent>
          <TooltipComponent tooltipContent="Add To Compare">
            <HiArrowPath aria-label="Compare" />
          </TooltipComponent>
          <TooltipComponent tooltipContent="Quick Overview">
            <IoEyeOutline aria-label="Quick Overview" />
          </TooltipComponent>
        </div> */}

        {/* Product Information (Name, Stock, Rating, Sold count) */}
        <div className="space-y-2">
          <h5 className="truncate text-xs font-medium lg:text-sm">{productName}</h5>

          {/* Stock, Rating, and Sold Badges */}
          <div className="hidden flex-wrap justify-between gap-2 lg:flex">
            {/* In Stock Badge */}
            <Badge variant={"success"} className="rounded-md text-xs uppercase">
              In Stock
            </Badge>

            {/* Rating Badge */}
            <Badge className="text-primary-foreground flex w-fit items-center justify-center gap-2 rounded-md border-yellow-500 bg-yellow-100 uppercase">
              <GoStarFill className="text-yellow-500" />
              <span>4.3 / (100)</span>
            </Badge>

            {/* Sold Count Badge */}
            <Badge variant={"accent"} className="hidden rounded-sm lg:block">
              Sold: 200
            </Badge>
          </div>

          {/* Mobile View Rating Badge (only visible on smaller screens) */}
          <Badge className="text-primary-foreground flex w-fit items-center justify-center gap-2 rounded-md border-yellow-500 bg-yellow-100 uppercase lg:hidden">
            <GoStarFill className="text-yellow-500" />
            <span>4.3 / (100)</span>
          </Badge>
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
