"use client";
import { debounce } from "@repo/utils/functions";
import { useCallback, useState } from "react";
import { RxCaretSort } from "react-icons/rx";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface OptionSelectProps<T> {
  multiSelect?: boolean;
  items: T[];
  selectedItems: T[];
  onSelectionChange: (items: T | T[]) => void;
  itemRenderer: (item: T) => React.ReactNode;
  placeholder?: string;
  isLoading?: boolean;
  getItemId: (item: T) => string | number;
  disabled?: boolean;
  disabledWarning?: string;
  // if we want to handle outside query params search.
  customQuerySearch: boolean;
  // this will be the outside query search handler
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
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
  disabled = false,
  disabledWarning = "Please match criteria!",
  placeholder = "Select Item",
  customQuerySearch,
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
    if (selectedItems.length === 0) return disabled ? disabledWarning : placeholder || placeholder;
    if (!multiSelect && selectedItems.length === 1) return itemRenderer(selectedItems[0]!);
    return `${selectedItems.length} items selected`;
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={disabled} asChild>
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
          {customQuerySearch ? (
            <Input
              placeholder={searchPlaceholder}
              className="h-8 rounded-none border-none text-xs"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          ) : (
            <CommandInput placeholder={searchPlaceholder} className="h-8 rounded-none border-none text-xs" />
          )}
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
