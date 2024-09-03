import { HiArrowPath } from "react-icons/hi2";
import { PiShoppingCartSimple, PiUserCircleLight } from "react-icons/pi";
import { SlHeart } from "react-icons/sl";
import TooltipComponent from "../ui/tooltip-component";

const NavIcons = () => {
  return (
    <div className="flex gap-3 text-lg lg:text-xl">
      <TooltipComponent tooltipContent="View Shopping Cart">
        <PiShoppingCartSimple aria-label="Shopping Cart" />
      </TooltipComponent>
      <TooltipComponent tooltipContent="View Compare Items">
        <HiArrowPath aria-label="Compare" />
      </TooltipComponent>
      <TooltipComponent tooltipContent="View Wishlist Items">
        <SlHeart aria-label="Wishlist" />
      </TooltipComponent>
      <TooltipComponent tooltipContent="View Profile">
        <PiUserCircleLight aria-label="User" />
      </TooltipComponent>
    </div>
  );
};

export default NavIcons;
