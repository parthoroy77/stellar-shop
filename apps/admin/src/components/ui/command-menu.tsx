import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";

const CommandMenu = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex w-full max-w-sm items-center gap-3">
      <div
        onClick={() => setOpen(true)}
        className="text-accent-foreground relative flex cursor-pointer items-center gap-2 text-sm lg:gap-3"
      >
        <button
          type="button"
          className="hover:bg-accent/40 relative flex items-center justify-center rounded-full text-black duration-300"
        >
          <GoSearch size={18} />
        </button>
        <span>Search</span>
        <kbd className="flex items-center gap-1 rounded-md border px-1 lg:px-3 lg:py-0.5">
          <span className="text-xs">⌘</span>
          <span>K</span>
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Popular Searches">
            <CommandItem>Analytics</CommandItem>
            <CommandItem>CRM</CommandItem>
            <CommandItem>eCommerce</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Apps & Pages">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Roles & Permissions</CommandItem>
            <CommandItem>Account Settings</CommandItem>
          </CommandGroup>
          <CommandGroup heading="User Interface">
            <CommandItem>Typography</CommandItem>
            <CommandItem>Accordion</CommandItem>
            <CommandItem>Cards</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default CommandMenu;
