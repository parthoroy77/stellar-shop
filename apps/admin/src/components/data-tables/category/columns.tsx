import { TCategory } from "@repo/utils/types";
import { Badge, Button, Checkbox } from "@ui/index";
import { ColumnDef } from "@ui/tanstack-table";
import { AiOutlineSortAscending } from "react-icons/ai";
import CategoryDataTableAction from "./data-table-action";

export const columns: ColumnDef<TCategory>[] = [
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
        <div className="text-start">
          <Button variant="ghost" size={"sm"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Categories
            <AiOutlineSortAscending className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex min-w-[300px] gap-3 text-sm capitalize lg:items-center">
          <img
            className="bg-accent size-9 rounded-md"
            src={
              row?.original?.images[0]?.file?.fileUrl ||
              "https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-2/assets/product-1-CnD-btSp.png"
            }
            alt="Category Image"
          />
          <div className="flex flex-col">
            <span className="text-xs font-medium lg:text-sm">{row.getValue("categoryName")}</span>
            <span className="text-accent-foreground truncate text-[10px] lg:text-xs">{row?.original?.description}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => {
      return (
        <div className="text-right">
          <span>Total Products</span>
        </div>
      );
    },
    cell: () => (
      <div className="text-accent-foreground text-right font-medium tracking-wider">
        <span>5000</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => {
      return (
        <div className="text-center">
          <span>Status</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant={"success"} className="rounded-md capitalize">
          {(row.getValue("status") as string)?.toLowerCase()}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => {
      return (
        <div className="text-center">
          <span>Actions</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <CategoryDataTableAction row={row} />
        </div>
      );
    },
  },
];
