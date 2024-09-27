import { Input } from "@ui/index";
import { useState } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";
import { AppSlider } from "../ui/app-slider";

const PriceRange = () => {
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
        <span className="font-medium capitalize">Price Range</span>
        {open ? <HiOutlineMinus /> : <HiOutlinePlus />}
      </button>
      {open && (
        <div className={`space-y-5 overflow-hidden px-4 py-3 transition-all duration-300 ${open ? "h-fit" : "h-0"}`}>
          <AppSlider max={400} min={0} step={1} className="mt-2" />
          <div className="flex justify-between gap-5">
            <Input placeholder="Min" className="h-[30px] w-20 text-xs" />
            <Input placeholder="Max" className="h-[30px] w-20 text-xs" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRange;
