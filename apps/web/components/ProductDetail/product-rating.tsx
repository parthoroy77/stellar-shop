import { FC } from "react";
import { GoStarFill } from "react-icons/go";
import ProductWishlistAndShare from "./product-wishlist-and-share";

interface Props {
  averageRating?: number;
  totalReview?: number;
  productId: number;
}

const ProductRating: FC<Props> = ({ totalReview, productId }) => {
  return (
    <div className="flex items-center justify-between gap-3">
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
      <ProductWishlistAndShare productId={productId} />
    </div>
  );
};

export default ProductRating;
