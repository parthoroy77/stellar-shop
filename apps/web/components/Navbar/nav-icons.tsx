import { HiArrowPath } from "react-icons/hi2";
import { SlHeart } from "react-icons/sl";
import CartHoverMenu from "./cart-hover-menu";
import NavProfileMenu from "./nav-profile-menu";

const NavIcons = () => {
  return (
    <div className="flex items-center gap-5">
      <CartHoverMenu />
      <div className="relative cursor-pointer">
        <HiArrowPath size={23} aria-label="Compare Product" />
        <div className="bg-primary absolute -right-3 -top-2 flex size-[14px] items-center justify-center rounded-full text-center text-[9px] text-xs text-white">
          <span>2</span>
        </div>
      </div>
      <div className="relative cursor-pointer">
        <SlHeart size={23} aria-label="Wishlists" />
        <div className="bg-primary absolute -right-3 -top-2 flex size-[14px] items-center justify-center rounded-full text-center text-[9px] text-xs text-white">
          <span>4</span>
        </div>
      </div>
      <NavProfileMenu />
    </div>
  );
};

export default NavIcons;
