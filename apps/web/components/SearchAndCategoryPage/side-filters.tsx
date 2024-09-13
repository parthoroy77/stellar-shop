"use client";
import { filters } from "@/dummyData/filters";
import { Checkbox, Label } from "@repo/ui";
import { HiOutlinePlus } from "react-icons/hi2";
import PriceRange from "./price-range";

const SideFilters = () => {
  return (
    <aside className="hidden h-fit w-[20%] divide-y rounded-md border *:px-6 *:py-4 lg:block">
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

const FilterItem = ({ label, options }: FilterItemProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-medium capitalize">{label}</span>
        <HiOutlinePlus />
      </div>
      <div className="space-y-2">
        {options.map((option, i) => (
          <span key={i} className="flex items-center gap-3">
            <Checkbox />
            <Label className="text-sm">{option.label}</Label>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SideFilters;
