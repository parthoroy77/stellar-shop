import { Button } from "@repo/ui";
import { GoStarFill } from "react-icons/go";
import { IoCheckmarkSharp, IoEyeOutline } from "react-icons/io5";
import { SlHeart } from "react-icons/sl";

const ProductCard = () => {
  return (
    <div className="hover:border-primary group relative min-h-[400px] rounded-md border duration-300">
      <div className="relative flex justify-center border-b p-3">
        <img
          className="size-[175px]"
          src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/product1-300x300.jpeg"
          alt="Product Image"
        />
        <div className="absolute bottom-2 hidden w-[90px] justify-center gap-5 rounded-md bg-white py-2 text-lg shadow-md *:cursor-pointer group-hover:flex">
          <SlHeart title="Add To Wishlist" />
          <IoEyeOutline title="Quick Overview" />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3 p-3">
        <div className="space-y-2">
          <h5 className="text-sm font-medium">DNA Motoring TOOLS-00266 Green</h5>
          <span className="text-sm font-medium">$9.99 - $9.99</span>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
            <GoStarFill className="text-yellow-500" />
            <span>4.3/5 (100)</span>
            <span>200 Sold</span>
          </div>
          <ul>
            <li className="flex items-center gap-1 text-[10px]">
              <IoCheckmarkSharp />5 YEARS GUARANTEE
            </li>
            <li className="flex items-center gap-1 text-[10px]">
              <IoCheckmarkSharp />5 YEARS GUARANTEE
            </li>
            <li className="flex items-center gap-1 text-[10px]">
              <IoCheckmarkSharp />5 YEARS GUARANTEE
            </li>
          </ul>
        </div>
        <Button className="w-full text-xs font-normal">Add To Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
