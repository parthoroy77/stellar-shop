import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui";
import { GoStarFill } from "react-icons/go";
import { HiArrowPath, HiOutlineShoppingBag } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import { SlHeart } from "react-icons/sl";

const ProductCard = () => {
  return (
    <div className="hover:border-primary group relative flex flex-col justify-between divide-y rounded-md border duration-300 lg:min-h-[400px]">
      <div className="relative flex justify-center p-3">
        <img
          className="size-[130px] lg:size-[175px]"
          src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/product1-300x300.jpeg"
          alt="Product Image"
        />
        {/* <div className="absolute bottom-2 hidden w-[130px] justify-center gap-5 rounded-md border bg-white py-2 text-lg shadow-md *:cursor-pointer group-hover:flex">
          <SlHeart title="Add To Wishlist" />
          <HiArrowPath title="Add To Compare" />
          <IoEyeOutline title="Quick Overview" />
        </div> */}
      </div>
      <div className="flex items-center justify-center gap-5 bg-white py-2 text-lg *:cursor-pointer">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <SlHeart />
            </TooltipTrigger>
            <TooltipContent>
              <p>Add To Wishlist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HiArrowPath />
            </TooltipTrigger>
            <TooltipContent>
              <p>Add To Compare</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoEyeOutline />
            </TooltipTrigger>
            <TooltipContent>
              <p>Quick Overview</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex h-full flex-col justify-between gap-3 p-3">
        <div className="space-y-2">
          <h5 className="text-xs font-medium lg:text-sm">DNA Motoring TOOLS-00266 Green</h5>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
            <GoStarFill className="text-yellow-500" />
            <span>4.3/5 (100)</span>|<span>200 Sold</span>
          </div>
          <p className="text-sm font-medium">
            <strike>$9.99</strike> - $9.99
          </p>
          {/* <ul>
            <li className="flex items-center gap-1 text-[10px]">
              <IoCheckmarkSharp />5 YEARS GUARANTEE
            </li>
            <li className="flex items-center gap-1 text-[10px]">
              <IoCheckmarkSharp />5 YEARS GUARANTEE
            </li>
            <li className="flex items-center gap-1 text-[10px]">
              <IoCheckmarkSharp />5 YEARS GUARANTEE
            </li>
          </ul> */}
        </div>
      </div>
      <div className="p-3">
        <Button className="group/button flex w-full items-center justify-center gap-3 text-xs font-normal transition-all duration-300">
          <span className="group-hover/button:hidden">Add To Cart</span>
          <HiOutlineShoppingBag className="hidden text-xl opacity-0 group-hover/button:block group-hover/button:opacity-100" />
        </Button>
      </div>
      {/* Absolute Elements */}
      <h6 className="bg-accent absolute left-1 top-1 rounded-md p-2 text-[9px] font-semibold uppercase">7% Off</h6>
    </div>
  );
};

export default ProductCard;
