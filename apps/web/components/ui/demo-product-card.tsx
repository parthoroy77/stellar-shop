import { Badge, Button } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";
import { BsHeart } from "react-icons/bs";
import { GoStarFill } from "react-icons/go";
import { HiArrowPath, HiOutlineShoppingBag } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import TooltipComponent from "./tooltip-component";

const DemoProductCard = () => {
  return (
    // Link to the product page
    <Link href={"/products/item"}>
      <div className="group relative flex flex-col justify-between divide-y rounded-md border duration-300 *:p-2 md:*:p-3">
        {/* Product Image */}
        <div className="relative flex justify-center">
          <Image
            width={100}
            height={100}
            className="size-[110px] lg:size-[150px]"
            src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/product1-300x300.jpeg"
            alt="Product Image"
          />
        </div>
        <div className="visible absolute right-0 top-0 flex flex-col gap-1 text-xs opacity-100 duration-300 group-hover:visible group-hover:opacity-100 md:text-sm lg:invisible lg:text-xl lg:opacity-0">
          <TooltipComponent tooltipContent="Add To Wishlist">
            <span className="bg-muted-foreground flex size-5 items-center justify-center rounded-full md:size-6 lg:size-8">
              <BsHeart aria-label="Wishlist" />
            </span>
          </TooltipComponent>
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
          <h5 className="text-pretty text-xs font-medium lg:text-sm">DNA Motoring TOOLS-00266 Green</h5>

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
          <p className="flex items-end gap-1 border-b border-b-white pb-0.5 text-xs font-medium">
            <span className="text-primary p-0 text-base font-semibold !leading-[1rem] lg:text-xl">$9.99</span>
            <span className="!leading-[0.8rem] text-gray-400 line-through">$12.59</span>
          </p>
          {/* Add to Cart Button */}
          <Button
            size={"sm"}
            variant={"accent"}
            className="group/button flex h-fit w-fit items-center justify-center gap-2 rounded-full p-[5px] font-normal transition-all duration-300 lg:rounded-md lg:p-2"
          >
            <HiOutlineShoppingBag className="text-base lg:text-lg" />
            <span className="hidden lg:block">Add To Cart</span>
          </Button>
        </div>

        {/* Discount Label (7% Off) */}
        <span className="text-muted-foreground absolute left-1 top-1 rounded-md bg-green-800 !px-2 !py-1 text-xs font-semibold uppercase">
          7% Off
        </span>
      </div>
    </Link>
  );
};

export default DemoProductCard;
