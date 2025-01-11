"use client";
import { Container } from "@repo/ui";
import Link from "next/link";
import { useState } from "react";
import { RiUser3Line } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../ui/logo";
import MobileDoc from "./mobile-doc";
import MobileSidebar from "./mobile-sidebar";
import NavSearchBar from "./nav-search-bar";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="border-b lg:hidden">
      <Container className={`flex flex-col gap-5 py-5`}>
        {/* Nav Search */}
        <NavSearchBar />
        <div className="flex items-center justify-between">
          <RxHamburgerMenu onClick={() => setIsOpen((prev) => !prev)} className="text-2xl" />
          <Logo />
          <Link href={"/profile"} className="cursor-pointer">
            <RiUser3Line className="block text-2xl" />
          </Link>
        </div>
      </Container>
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileDoc isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MobileNav;
