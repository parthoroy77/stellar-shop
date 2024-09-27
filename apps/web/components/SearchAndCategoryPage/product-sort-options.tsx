"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";
import { productsPerViewOptions, sortOptions } from "@repo/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const ProductSortOptions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper to update the query parameters
  const updateQueryParams = useCallback(
    (key: string, value: string) => {
      console.log(key, value);
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      router.push(`?${params.toString()}`); // Update URL with the new query
    },
    [router, searchParams]
  );

  // Handle the change for items per view
  const handleItemsPerViewChange = useCallback(
    (value: string) => {
      updateQueryParams("limit", value);
    },
    [updateQueryParams]
  );

  // Handle the change for sorting options
  const handleSortChange = useCallback(
    (id: string) => {
      const selectedOption = sortOptions.find((option) => option.id === Number(id));
      if (selectedOption) {
        // Merge the existing query parameters
        const params = new URLSearchParams(searchParams.toString());
        params.set("sortBy", selectedOption.sortBy);
        params.set("order", selectedOption.order);
        // Push both parameters at once
        router.push(`?${params.toString()}`);
      }
    },
    [router, searchParams]
  );

  return (
    <div className="hidden gap-5 lg:flex">
      <div className="flex items-center gap-2">
        <span className="text-accent-foreground block text-xs">Show:</span>
        <Select onValueChange={handleItemsPerViewChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Show" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {productsPerViewOptions.map((op, i) => (
                <SelectItem className="text-xs" key={i} value={op.value.toString()}>
                  {op.label} Item
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-accent-foreground block text-xs">Sort:</span>
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sortOptions.map((op, i) => (
                <SelectItem key={i} value={op.id.toString()}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductSortOptions;
