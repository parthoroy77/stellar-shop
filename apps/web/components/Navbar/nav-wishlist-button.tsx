"use client";
import { useWishlistContext } from "@/contexts/wishlist-context";
import Link from "next/link";
import { SlHeart } from "react-icons/sl";

const NavWishlistButton = () => {
  const { wishlistCount } = useWishlistContext();
  return (
    <Link href={"/wishlist"}>
      <div className="relative cursor-pointer">
        <SlHeart size={23} aria-label="Wishlists" />
        <div className="bg-primary absolute -right-3.5 -top-2.5 flex size-4 items-center justify-center rounded-full text-center text-xs text-white">
          <span>{wishlistCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default NavWishlistButton;
