import { HiArrowPath } from "react-icons/hi2";
import { PiShoppingCartSimple, PiUserCircleLight } from "react-icons/pi";
import { SlHeart } from "react-icons/sl";
import TooltipComponent from "../ui/tooltip-component";

const NavIcons = () => {
  return (
    <div className="flex gap-5 text-xl">
      <TooltipComponent tooltipContent="View Shopping Cart">
        <PiShoppingCartSimple />
      </TooltipComponent>
      <TooltipComponent tooltipContent="View Compare Items">
        <HiArrowPath />
      </TooltipComponent>
      <TooltipComponent tooltipContent="View Wishlist Items">
        <SlHeart />
      </TooltipComponent>
      <TooltipComponent tooltipContent="View Profile">
        <PiUserCircleLight />
      </TooltipComponent>
    </div>
  );
};

export default NavIcons;
