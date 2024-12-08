"use client";

import { ChevronsUpDown } from "lucide-react";

import { VariantProps } from "class-variance-authority";
import { ReactNode, useState } from "react";
import { Button, buttonVariants } from "./button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface ComboboxProps<T> {
  items: T[];
  selectedItem: T;
  onValueChange: (item: T) => void;
  getItemId: (item: T) => string;
  itemRenderer: (item: T) => ReactNode;
  placeholder: string;
  disabled?: boolean;
  isLoading?: boolean;
  buttonVariants: VariantProps<typeof buttonVariants>;
}

export function Combobox<T>({
  items = [],
  selectedItem,
  onValueChange,
  placeholder = "Select here!",
  disabled = false,
  isLoading = false,
  itemRenderer,
  getItemId,
  buttonVariants,
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const handleSelect = (item: T) => {
    onValueChange(item);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled || isLoading}
          variant={buttonVariants.variant || "outline"}
          size={buttonVariants.size}
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedItem ? itemRenderer(selectedItem) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandEmpty>Nothing found!</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {items?.map((item) => (
                <CommandItem key={getItemId(item)} onSelect={() => handleSelect(item)}>
                  {itemRenderer(item)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
