import Link from "next/link";
import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { HiOutlineHome } from "react-icons/hi2";
import { PiShoppingCartSimple } from "react-icons/pi";
import { RiSearch2Line } from "react-icons/ri";
import { SlHeart } from "react-icons/sl";
const MobileDoc = ({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div className="text-primary-foreground fixed bottom-0 z-50 flex w-full items-center justify-evenly gap-4 border-t-2 bg-white px-4 py-3 md:hidden">
      {/* <div className="bg-primary text-background fixed -bottom-1 z-50 flex w-full items-center justify-center gap-5 py-3 md:hidden"> */}
      {/* home */}
      <Link href={"/"} className="flex flex-col items-center justify-center">
        <HiOutlineHome size={20} />
        <span>Home</span>
      </Link>
      <p onClick={() => setIsOpen((prev) => !prev)} className="flex flex-col items-center justify-center">
        <BiCategoryAlt size={20} />
        <span>Category</span>
      </p>
      {/* category */}

      {/* search */}
      <Link href={"/"} className="flex flex-col items-center justify-center">
        <RiSearch2Line size={20} />
        <span>Search</span>
      </Link>
      {/* wishlist */}
      <Link href={"/"} className="flex flex-col items-center justify-center">
        <SlHeart size={20} />
        <span>Wishlist</span>
      </Link>
      {/* cart */}
      <Link href={"/"} className="flex flex-col items-center justify-center">
        <PiShoppingCartSimple size={20} />
        <span>Cart</span>
      </Link>
    </div>
  );
};

export default MobileDoc;
