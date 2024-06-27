import { Button } from "@repo/ui";
import { GoStarFill } from "react-icons/go";
import { IoCheckmarkSharp } from "react-icons/io5";

const ProductCard = () => {
  return (
    <div className="hover:border-primary relative min-h-[400px] rounded-md border duration-300">
      <div className="flex justify-center border-b p-3">
        <img
          className="size-[175px]"
          src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/product1-300x300.jpeg"
          alt="Product Image"
        />
      </div>
      <div className="flex flex-col gap-3 justify-between p-3">
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
