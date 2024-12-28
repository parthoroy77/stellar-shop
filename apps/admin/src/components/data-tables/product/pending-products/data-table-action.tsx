import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/index";

import { TProduct } from "@repo/utils/types";
import { Button } from "@ui/index";
import { Row } from "@ui/tanstack-table";
import { IoCheckmarkDone } from "react-icons/io5";
import { LuMoreVertical, LuX } from "react-icons/lu";
import { SlMagnifierAdd } from "react-icons/sl";

export const PendingProductDataTableAction = ({ row }: { row: Row<TProduct> }) => {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant={"link"} size={"sm"} className="flex h-8 w-fit gap-2 border px-3 py-1">
        <SlMagnifierAdd />
        <span>View</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="accent" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <LuMoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[160px]" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2">
            <IoCheckmarkDone color="green" />
            <span>Approve</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <LuX color="red" />
            <span>Reject</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
