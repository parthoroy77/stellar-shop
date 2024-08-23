import { Button } from "@repo/ui";
import Link from "next/link";
import { GoStarFill } from "react-icons/go";
import { HiArrowPath, HiOutlineShoppingBag } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import { SlHeart } from "react-icons/sl";
import TooltipComponent from "./tooltip-component";

const ProductCard = () => {
  return (
    <Link href={"/products/item"}>
      <div className="hover:border-primary group relative flex flex-col justify-between divide-y rounded-md border duration-300 *:p-3">
        <div className="relative flex justify-center">
          <img
            className="size-[130px] lg:size-[150px]"
            src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/product1-300x300.jpeg"
            alt="Product Image"
          />
        </div>
        <div className="flex items-center justify-center gap-5 text-lg *:cursor-pointer">
          <TooltipComponent tooltipContent="Add To Wishlist">
            <SlHeart />
          </TooltipComponent>
          <TooltipComponent tooltipContent="Add To Compare">
            <HiArrowPath />
          </TooltipComponent>
          <TooltipComponent tooltipContent="Quick Overview">
            <IoEyeOutline />
          </TooltipComponent>
        </div>
        <div className="space-y-2">
          <h5 className="text-xs font-medium lg:text-sm">DNA Motoring TOOLS-00266 Green</h5>
          <span className="block text-xs font-semibold uppercase text-green-700">IN STOCK</span>
          <div className="flex flex-col gap-2 text-xs font-medium text-gray-600 md:flex-row md:items-center">
            <div className="flex items-center gap-1">
              <GoStarFill className="text-yellow-500" />
              <span>4.3 / (100)</span>
            </div>
            <span className="text-primary">200 Sold</span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="flex items-end gap-2 text-xs font-medium lg:text-sm">
            <span className="text-primary text-sm font-semibold lg:text-xl">$9.99</span>
            <strike className="text-gray-400">$9.99</strike>
          </p>
          <Button
            size={"sm"}
            className="group/button flex h-fit w-fit items-center justify-center gap-2 rounded-full p-1 font-normal transition-all duration-300 lg:rounded-md lg:p-2"
          >
            <HiOutlineShoppingBag className="text-sm lg:text-lg" />
            <span className="hidden lg:block">Add To Cart</span>
          </Button>
        </div>
        {/* Absolute Elements */}
        <span className="bg-primary absolute left-1 top-1 rounded-md !px-2 !py-1 text-xs font-semibold uppercase text-white">
          7% Off
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
