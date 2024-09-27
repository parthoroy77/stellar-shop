import { Checkbox, Label } from "@ui/index";
import { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";
type TFilterOption = {
  label: string;
  value: string;
  productCount?: number;
};

// Define props for each individual filter item
interface TFilterItemProps {
  label: string;
  options: TFilterOption[];
  filters: Record<string, string[] | string>;
  setFilters: Dispatch<SetStateAction<Record<string, string[] | string>>>;
}

// Memoized component for rendering individual filter sections
const FilterItem: FC<TFilterItemProps> = ({ label, options, filters, setFilters }) => {
  const [open, setOpen] = useState(true);

  // Convert label to lowercase for consistent filter key usage
  const lowerLabel = useMemo(() => label.toLowerCase(), [label]);

  // Toggle filter options when clicked and update filters state
  const handleCheck = useCallback(
    (value: string) => {
      const currentFilter = Array.isArray(filters[lowerLabel]) ? (filters[lowerLabel] as string[]) : [];
      const updatedFilter = currentFilter.includes(value)
        ? currentFilter.filter((item) => item !== value) // Remove filter if already selected
        : [...currentFilter, value]; // Add filter if not selected

      setFilters((prev) => ({
        ...prev,
        [lowerLabel]: updatedFilter, // Update the filters state
      }));
    },
    [filters, lowerLabel, setFilters]
  );

  return (
    <div className="divide-y border">
      {/* Toggle to open/close the filter section */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="hover:bg-accent/30 flex w-full items-center justify-between px-4 py-3 text-sm duration-300"
      >
        <span className="font-medium capitalize">{label}</span>
        {open ? <HiOutlineMinus /> : <HiOutlinePlus />}
      </button>

      {/* Filter options */}
      {open && (
        <div className={`space-y-2 overflow-hidden px-4 py-3 transition-all duration-300 ${open ? "h-fit" : "h-0"}`}>
          {options.map((option, i) => (
            <span
              key={i}
              onClick={() => handleCheck(option.value)} // Handle the filter selection
              className="flex items-center gap-3"
            >
              {/* Checkbox for each filter option */}
              <Checkbox checked={filters[lowerLabel]?.includes(option.value) || false} />
              <Label className="cursor-pointer text-xs text-black">
                {option.label} ({option.productCount ?? 0})
              </Label>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterItem;
