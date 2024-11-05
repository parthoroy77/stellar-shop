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
    cell: ({ row }) => (
      <div className="flex min-w-[300px] gap-3 text-sm capitalize lg:items-center">
        <img
          className="bg-accent size-9 rounded-md"
          src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-2/assets/product-1-CnD-btSp.png"
          alt="Category Image"
        />
        <div className="flex flex-col">
          <span className="text-xs font-medium lg:text-sm">{row.getValue("categoryName")}</span>
          <span className="text-accent-foreground text-[10px] lg:text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti, assumenda?
          </span>
        </div>
      </div>
    ),
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
        <div className="text-right">
          <span>Status</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-right">
        <Badge variant={"success"} className="rounded-md capitalize">
          {(row.getValue("status") as string)?.toLowerCase()}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return <CategoryDataTableAction />;
    },
  },
];
