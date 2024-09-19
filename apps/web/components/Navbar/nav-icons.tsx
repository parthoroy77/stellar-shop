import { HiArrowPath } from "react-icons/hi2";
import { PiUserCircleLight } from "react-icons/pi";
import { SlHeart } from "react-icons/sl";
import CartHoverMenu from "./cart-hover-menu";

const NavIcons = () => {
  return (
    <div className="flex items-center gap-5">
      <CartHoverMenu />
      <div className="relative cursor-pointer">
        <HiArrowPath size={23} aria-label="Compare Product" />
        <span className="bg-primary absolute -right-3 -top-2 size-4 rounded-full text-center text-[10px] text-xs text-white">
          4
        </span>
      </div>
      <div className="relative cursor-pointer">
        <SlHeart size={23} aria-label="Wishlists" />
        <span className="bg-primary absolute -right-3 -top-2 size-4 rounded-full text-center text-[10px] text-xs text-white">
          4
        </span>
      </div>
      <div className="flex items-center gap-1">
        <PiUserCircleLight size={26} aria-label="User" />
      </div>
    </div>
  );
};

export default NavIcons;
