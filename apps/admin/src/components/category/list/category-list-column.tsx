"use client";

import {
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui";
import { TCategory } from "@repo/utils/types";
import { ColumnDef } from "@ui/tanstack-table";
import { AiOutlineSortAscending } from "react-icons/ai";
import { BiDotsHorizontal } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";

export const categoryListColumn: ColumnDef<TCategory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" size={"sm"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          CATEGORIES
          <AiOutlineSortAscending className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-3 text-sm capitalize">
        <img
          className="bg-accent size-9 rounded-md"
          src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-2/assets/product-1-CnD-btSp.png"
          alt="Category Image"
        />
        <div className="flex flex-col">
          <span className="text-base">{row.getValue("categoryName")}</span>
          <span className="text-accent-foreground text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti, assumenda?
          </span>
        </div>
      </div>
    ),
  },
  {
    header: "Total Products",

    cell: () => <span className="text-accent-foreground font-medium">5000</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={"success"} className="rounded-md">
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <div>
          <Button type="button" variant={"ghost"} size={"sm"}>
            <span className="sr-only">Open category edit menu</span>
            <FaRegEdit size={20} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="ghost" size={"sm"}>
                <span className="sr-only">Open menu</span>
                <BiDotsHorizontal size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
