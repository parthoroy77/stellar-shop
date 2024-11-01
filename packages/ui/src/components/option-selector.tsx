"use client";
import { debounce } from "@repo/utils/functions";
import { useCallback, useState } from "react";
import { RxCaretSort } from "react-icons/rx";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface OptionSelectProps<T> {
  items: T[];
  selectedItems: T[];
  onSelectionChange: (items: T | T[]) => void;
  searchPlaceholder?: string;
  itemRenderer: (item: T) => React.ReactNode;
  isLoading?: boolean;
  onSearch?: (term: string) => void;
  multiSelect?: boolean;
  getItemId: (item: T) => string | number;
}

function OptionSelect<T>({
  items,
  selectedItems = [],
  onSelectionChange,
  searchPlaceholder = "Search here...",
  itemRenderer,
  isLoading = false,
  onSearch,
  multiSelect = false,
  getItemId,
}: OptionSelectProps<T>) {
  const [open, setOpen] = useState(false);

  // Debounced search handler
  const handleSearchChange = useCallback(
    debounce((value: string) => {
      onSearch && onSearch(value);
    }, 500),
    [onSearch]
  );

  const handleSelect = (item: T) => {
    const itemId = getItemId(item);
    const isSelected = selectedItems.some((selectedItem) => getItemId(selectedItem) === itemId);

    if (multiSelect) {
      const newSelectedItems = isSelected
        ? selectedItems.filter((selectedItem) => getItemId(selectedItem) !== itemId)
        : [...selectedItems, item];
      onSelectionChange(newSelectedItems);
    } else {
      onSelectionChange(item); // Pass a single item in single-select mode
      setOpen(false);
    }
  };

  const renderSelectedItems = () => {
    if (selectedItems.length === 0) return "Select items";
    if (!multiSelect && selectedItems.length === 1) return itemRenderer(selectedItems[0]!);
    return `${selectedItems.length} items selected`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border"
        >
          <span className="truncate">{renderSelectedItems()}</span>
          <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <Input
            placeholder={searchPlaceholder}
            className="h-8 rounded-none border-none text-xs"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <CommandSeparator />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {isLoading ? (
                <CommandItem>Loading...</CommandItem>
              ) : (
                items.map((item) => (
                  <CommandItem
                    key={getItemId(item)}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center gap-2"
                  >
                    {multiSelect && (
                      <Checkbox
                        checked={selectedItems.some((selectedItem) => getItemId(selectedItem) === getItemId(item))}
                        onCheckedChange={() => handleSelect(item)}
                      />
                    )}
                    {itemRenderer(item)}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { OptionSelect };
