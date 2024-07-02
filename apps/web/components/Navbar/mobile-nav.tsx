"use client";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Container from "../ui/container";
import Logo from "../ui/logo";
import MobileSidebar from "./mobile-sidebar";
import NavIcons from "./nav-icons";
import NavSearchBar from "./nav-search-bar";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Container className={`flex flex-col gap-5 py-5`}>
        <NavSearchBar />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <RxHamburgerMenu onClick={() => setIsOpen((prev) => !prev)} className="text-2xl" />
            <Logo />
          </div>
          <NavIcons />
        </div>
      </Container>
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default MobileNav;
