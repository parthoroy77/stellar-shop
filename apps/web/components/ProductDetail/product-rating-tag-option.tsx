import { Badge } from "@repo/ui";
import { BiShareAlt } from "react-icons/bi";
import { GoStarFill } from "react-icons/go";
import { SlHeart } from "react-icons/sl";
const ProductRatingTagsOption = () => {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-wrap gap-3">
        <div className="flex w-fit items-center gap-2 rounded-md border-2 border-yellow-500 bg-yellow-100 px-3 py-1">
          <div className="flex">
            <GoStarFill size={12} className="text-yellow-400" />
            <GoStarFill size={12} className="text-yellow-400" />
            <GoStarFill size={12} className="text-yellow-400" />
            <GoStarFill size={12} className="text-yellow-400" />
            <GoStarFill size={12} className="text-yellow-400" />
          </div>
          <span className="text-xs font-medium uppercase">30 Reviews</span>
        </div>
        <Badge className="rounded-md uppercase">30% OFF</Badge>
        <Badge className="rounded-md uppercase">LOW STOCK</Badge>
        <Badge className="rounded-md uppercase">SALE</Badge>
      </div>
      <div className="flex justify-end gap-5 pt-1 text-lg *:cursor-pointer">
        <BiShareAlt />
        <SlHeart />
      </div>
    </div>
  );
};

export default ProductRatingTagsOption;
