import { PiShoppingCartSimple, PiUserCircleLight } from "react-icons/pi";
import { SlHeart } from "react-icons/sl";
const NavIcons = () => {
  return (
    <div className="flex gap-5 text-xl">
      <PiShoppingCartSimple />
      <SlHeart />
      <PiUserCircleLight />
    </div>
  );
};

export default NavIcons;
