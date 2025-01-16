import { BiShareAlt } from "react-icons/bi";
import ToggleWishlistButton from "../ui/toggle-wishlist-button";

const ProductWishlistAndShare = ({ productId }: { productId: number }) => {
  return (
    <div className="flex items-center gap-2 *:cursor-pointer">
      <BiShareAlt aria-label="Share" size={20} />
      <ToggleWishlistButton productId={productId} className="bg-white" />
    </div>
  );
};

export default ProductWishlistAndShare;
