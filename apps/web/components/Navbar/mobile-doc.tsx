import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiCategoryAlt, BiSolidCategoryAlt } from "react-icons/bi";
import { HiMiniHome, HiOutlineHome } from "react-icons/hi2";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { PiShoppingCartSimple, PiShoppingCartSimpleFill } from "react-icons/pi";

const mobileDocItems = [
  { label: "Home", ActiveIcon: HiMiniHome, InActiveIcon: HiOutlineHome, href: "/" },
  { label: "Category", ActiveIcon: BiSolidCategoryAlt, InActiveIcon: BiCategoryAlt, href: null },
  { label: "Wishlist", ActiveIcon: IoMdHeart, InActiveIcon: IoMdHeartEmpty, href: "/wishlist" },
  { label: "Cart", ActiveIcon: PiShoppingCartSimpleFill, InActiveIcon: PiShoppingCartSimple, href: "/cart" },
];

interface MobileDocProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Memoize the MobileDoc component for performance optimization
const MobileDoc: React.FC<MobileDocProps> = React.memo(({ setIsOpen, isOpen }) => {
  const pathname = usePathname();

  return (
    <div className="text-primary-foreground fixed bottom-0 z-50 flex h-[55px] w-full items-center justify-evenly gap-4 border-t-2 bg-white p-3 text-xs md:hidden">
      {mobileDocItems.map(({ href, label, ActiveIcon, InActiveIcon }, i) =>
        href ? (
          <Link
            key={i}
            href={href}
            onClick={() => setIsOpen(false)}
            className={`flex flex-col items-center justify-center ${pathname === href && !isOpen ? "font-semibold" : ""}`}
            aria-label={label}
          >
            {pathname === href && !isOpen ? <ActiveIcon size={18} /> : <InActiveIcon size={18} />}
            <span>{label}</span>
          </Link>
        ) : (
          <button
            key={i}
            onClick={() => setIsOpen((prev) => !prev)}
            className={`flex flex-col items-center justify-center ${isOpen ? "font-semibold" : ""}`}
            aria-label="Toggle Category"
          >
            {isOpen ? <ActiveIcon size={18} /> : <InActiveIcon size={18} />}
            <span>{label}</span>
          </button>
        )
      )}
    </div>
  );
});

export default MobileDoc;
