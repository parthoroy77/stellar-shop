"use client";
import { Button } from "@ui/index";
import { useState } from "react";
import { RiEqualizer2Line } from "react-icons/ri";
import MobileFilterMenu from "./mobile-filter-menu";

const MobileFilterTrigger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="lg:hidden">
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        variant={"outline"}
        size={"sm"}
        className="flex items-center gap-1"
      >
        <span>Filters</span>
        <RiEqualizer2Line />
      </Button>
      <MobileFilterMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MobileFilterTrigger;
