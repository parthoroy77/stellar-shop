import { Badge } from "@repo/ui";
import { ITag } from "@repo/utils/types";
import { FC } from "react";
import { BiShareAlt } from "react-icons/bi";
import { GoStarFill } from "react-icons/go";
import { SlHeart } from "react-icons/sl";

interface Props {
  tags?: ITag[];
  averageRating?: number;
  totalReview?: number;
}

const ProductRatingTags: FC<Props> = ({ tags, totalReview, averageRating }) => {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-wrap gap-3">
        {totalReview && averageRating && (
          <div className="flex w-fit items-center gap-2 rounded-md border border-yellow-500 bg-yellow-100 px-3 py-1">
            <div className="flex">
              <GoStarFill size={12} className="text-yellow-400" />
              <GoStarFill size={12} className="text-yellow-400" />
              <GoStarFill size={12} className="text-yellow-400" />
              <GoStarFill size={12} className="text-yellow-400" />
              <GoStarFill size={12} className="text-yellow-400" />
            </div>
            <span className="text-xs font-medium uppercase">{totalReview} Reviews</span>
          </div>
        )}
        <Badge className="rounded-md uppercase">30% OFF</Badge>
        <Badge className="rounded-md uppercase">LOW STOCK</Badge>
        <Badge className="rounded-md uppercase">SALE</Badge>
        {tags?.map((tag) => (
          <Badge key={tag.id} variant={"accent"} className="rounded-md uppercase">
            {tag.name}
          </Badge>
        ))}
      </div>
      <div className="flex justify-end gap-5 pt-1 text-lg *:cursor-pointer">
        <BiShareAlt aria-label="Share" />
        <SlHeart aria-label="Wishlist" />
      </div>
    </div>
  );
};

export default ProductRatingTags;
