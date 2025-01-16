import { FC } from "react";
import { BiShareAlt } from "react-icons/bi";
import { GoStarFill } from "react-icons/go";
import { SlHeart } from "react-icons/sl";

interface Props {
  averageRating?: number;
  totalReview?: number;
}

const ProductRating: FC<Props> = ({ totalReview }) => {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-wrap gap-3">
        <div className="flex w-fit items-center gap-3 rounded-md">
          <div className="flex">
            {Array.from({ length: 5 }).map((_x, idx) => (
              <GoStarFill kernelMatrix={idx} size={18} className="text-yellow-400" />
            ))}
          </div>
          <span className="text-sm font-semibold capitalize">{totalReview === 0 ? "No" : totalReview} Reviews</span>
        </div>
      </div>
      <div className="flex justify-end gap-5 pt-1 text-lg *:cursor-pointer">
        <BiShareAlt aria-label="Share" />
        <SlHeart aria-label="Wishlist" />
      </div>
    </div>
  );
};

export default ProductRating;
