import { useRouter } from "next/navigation";
import React, { Dispatch, memo, SetStateAction, useCallback } from "react";

const FilterClearMenu = memo(
  ({ setFilters }: { setFilters: Dispatch<SetStateAction<Record<string, string[] | string>>> }) => {
    const router = useRouter();

    // Function to clear filters and reset URL
    const clearFilters = useCallback(() => {
      setFilters({});
      router.push(""); // Clear query parameters from URL
    }, [router]);

    return (
      <div className="hover:bg-accent/30 flex w-full items-center justify-between px-4 py-3 text-sm duration-300">
        <span className="font-medium capitalize">Filters</span>
        <button onClick={clearFilters}>Clear</button>
      </div>
    );
  }
);
export default FilterClearMenu;
