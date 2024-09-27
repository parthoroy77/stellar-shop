"use client";
import { filters } from "@/dummyData/filters";
import { Checkbox, Label } from "@repo/ui";
import { useState } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";
import PriceRange from "./price-range";

const SideFilters = ({ mobileView }: { mobileView: boolean }) => {
  // if mobile view then class will be different from web
  const sidebarClasses = mobileView
    ? `h-fit divide-y *:border *:rounded-md space-y-3`
    : `hidden h-fit w-[20%] rounded-md *:border *:rounded-md space-y-3 lg:block`;

  return (
    <aside className={sidebarClasses}>
      <FilterClearMenu />
      <PriceRange />
      {filters.map((item, i) => (
        <FilterItem key={i} label={item.label} options={item.options} />
      ))}
    </aside>
  );
};

type FilterItemProps = {
  label: string;
  options: { label: string; value: string }[];
};

const FilterClearMenu = () => {
  return (
    <div className="hover:bg-accent/30 flex w-full items-center justify-between px-4 py-3 text-sm duration-300">
      <span className="font-medium capitalize">Filters</span>
      <button>Clear</button>
    </div>
  );
};

const FilterItem = ({ label, options }: FilterItemProps) => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="divide-y border">
      <button
        onClick={handleOpen}
        className="hover:bg-accent/30 flex w-full items-center justify-between px-4 py-3 text-sm duration-300"
      >
        <span className="font-medium capitalize">{label}</span>
        {open ? <HiOutlineMinus /> : <HiOutlinePlus />}
      </button>
      {open && (
        <div className={`space-y-2 overflow-hidden px-4 py-3 transition-all duration-300 ${open ? "h-fit" : "h-0"}`}>
          {options.map((option, i) => (
            <span key={i} className="flex items-center gap-3">
              <Checkbox />
              <Label className="text-xs text-black">{option.label} (1)</Label>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideFilters;
