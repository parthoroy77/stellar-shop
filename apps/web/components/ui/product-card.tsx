import { Button } from "@repo/ui";
import { IoCheckmarkSharp } from "react-icons/io5";
import { TiStar } from "react-icons/ti";

const ProductCard = () => {
  return (
    <div className="hover:border-primary relative rounded-md border duration-300">
      <div className="flex justify-center border-b p-3">
        <img
          className="size-[175px]"
          src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/product1-300x300.jpeg"
          alt="Product Image"
        />
      </div>
      <div className="space-y-3 p-3">
        <h5 className="text-sm font-medium">DNA Motoring TOOLS-00266 Green</h5>
        <span className="text-sm font-medium">$9.99 - $9.99</span>
        <span className="flex items-center text-xs text-yellow-500">
          <TiStar />
          <TiStar />
          <TiStar />
          <TiStar />
          <TiStar />
        </span>
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
        <Button className="w-full text-xs font-normal">Add To Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
