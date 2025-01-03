import { HiArrowPath } from "react-icons/hi2";
import CartHoverMenu from "./cart-hover-menu";
import NavProfileMenu from "./nav-profile-menu";
import NavWishlistButton from "./nav-wishlist-button";

const NavIcons = () => {
  return (
    <div className="flex items-center gap-5">
      <CartHoverMenu />
      <div className="relative cursor-pointer">
        <HiArrowPath size={23} aria-label="Compare Product" />
        <div className="bg-primary absolute -right-3.5 -top-2.5 flex size-4 items-center justify-center rounded-full text-center text-xs text-white">
          <span>2</span>
        </div>
      </div>
      <NavWishlistButton />
      <NavProfileMenu />
    </div>
  );
};

export default NavIcons;
