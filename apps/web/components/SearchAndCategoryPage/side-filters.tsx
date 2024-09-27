"use client";

import { filtersData } from "@/dummyData/filters";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import FilterClearMenu from "./filter-clear-menu";
import FilterItem from "./filter-item";
import PriceRange from "./price-range";

// Define types for filter options and items
type TFilterOption = {
  label: string;
  value: string;
  productCount?: number;
};

type TFilterItem = {
  label: string;
  options: TFilterOption[];
};

// Props for the SideFilters component
interface SideFiltersProps {
  mobileView: boolean;
}

const SideFilters: FC<SideFiltersProps> = ({ mobileView }) => {
  const [filters, setFilters] = useState<Record<string, string[] | string>>({});
  const router = useRouter();

  // Memoized function to update the URL query based on filters
  const updatedQuery = useCallback(
    (state: Record<string, string[] | string>) => {
      const query = new URLSearchParams();

      Object.entries(state).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            query.set(key.toLowerCase(), value.join(","));
          }
        } else {
          query.set(key.toLowerCase(), value);
        }
      });

      router.push(`?${query.toString()}`, {
        scroll: false, // Prevent scrolling when updating the URL
      });
    },
    [router]
  );

  // Update URL query when filters change
  useEffect(() => {
    updatedQuery(filters);
  }, [filters, updatedQuery]);

  // Memoize the sidebar class to prevent recalculation on each render
  const sidebarClasses = useMemo(
    () =>
      mobileView
        ? `h-fit divide-y *:border *:rounded-md space-y-3`
        : `hidden h-fit w-[20%] rounded-md *:border *:rounded-md space-y-3 lg:block`,
    [mobileView]
  );

  return (
    <aside className={sidebarClasses}>
      {/* Clear all filters */}
      <FilterClearMenu setFilters={setFilters} />

      {/* Price range filter */}
      <PriceRange max={1000} filters={filters} setFilters={setFilters} />

      {/* Render filter items */}
      {filtersData?.map((item, i) => (
        <FilterItem filters={filters} setFilters={setFilters} key={i} label={item.label} options={item.options} />
      ))}
    </aside>
  );
};

export default SideFilters;
