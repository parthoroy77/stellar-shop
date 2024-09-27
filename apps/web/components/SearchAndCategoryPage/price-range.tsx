import { debounce } from "@repo/utils/functions";
import { Input } from "@ui/index";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";
import { AppSlider } from "../ui/app-slider";

type PriceRangeProps = {
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string[] | string>>>;
  filters: Record<string, string[] | string>;
  max: number;
};

const PriceRange: React.FC<PriceRangeProps> = ({ setFilters, max }) => {
  const [open, setOpen] = useState(true);

  // Explicitly ensure minPrice and maxPrice are numbers
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(max);

  // Track user interaction
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Debounced updateFilters function to avoid excessive state updates
  const updateFilters = useCallback(
    debounce((newMin: number, newMax: number) => {
      if (hasInteracted) {
        setFilters((prev) => ({
          ...prev,
          min: newMin.toString(),
          max: newMax.toString(),
        }));
      }
    }, 300), // 300ms debounce delay
    [hasInteracted, setFilters]
  );

  // Trigger the debounced updateFilters when minPrice or maxPrice changes
  useEffect(() => {
    updateFilters(minPrice, maxPrice);
  }, [minPrice, maxPrice, updateFilters]);

  // Handle input changes and set interaction state
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setValue(Number(e.target.value));
    setHasInteracted(true);
  };

  return (
    <div className="divide-y border">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="hover:bg-accent/30 flex w-full items-center justify-between px-4 py-3 text-sm duration-300"
      >
        <span className="font-medium capitalize">Price Range</span>
        {open ? <HiOutlineMinus /> : <HiOutlinePlus />}
      </button>
      {open && (
        <div className={`space-y-5 overflow-hidden px-4 py-3 transition-all duration-300 ${open ? "h-fit" : "h-0"}`}>
          <AppSlider
            min={0}
            max={max}
            step={1}
            value={[minPrice, maxPrice]}
            onValueChange={([min, max]) => {
              setMinPrice(min as number);
              setMaxPrice(max as number);
              setHasInteracted(true); // Set interaction flag on slider change
            }}
            className="mt-2"
          />
          <div className="flex justify-between gap-5">
            <Input
              placeholder="Min"
              value={minPrice}
              onChange={(e) => handleInputChange(e, setMinPrice)}
              className="h-[30px] w-20 text-xs"
            />
            <Input
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => handleInputChange(e, setMaxPrice)}
              className="h-[30px] w-20 text-xs"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRange;
