import { TSeller } from "@repo/utils/types";
import { Badge, Button, Checkbox } from "@ui/index";
import { ColumnDef } from "@ui/tanstack-table";
import { AiOutlineSortAscending } from "react-icons/ai";

export const columns: ColumnDef<TSeller>[] = [
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
    accessorKey: "shopName",
    header: ({ column }) => {
      return (
        <div className="text-start">
          <Button variant="ghost" size={"sm"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Shop Name
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
              row?.original?.logo?.fileUrl ||
              "https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-2/assets/product-1-CnD-btSp.png"
            }
            alt="Category Image"
          />
          <div className="flex flex-col">
            <span className="text-xs font-medium lg:text-sm">{row.getValue("shopName")}</span>
            <span className="text-accent-foreground truncate text-[10px] lg:text-xs">
              {row?.original?.shopDescription}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "userId",
    header: () => {
      return (
        <div className="w-fit text-start">
          <Button variant="ghost" size={"sm"}>
            Owner Name
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 text-sm capitalize lg:items-center">
          <span className="text-xs font-medium lg:text-sm">{row?.original.user?.fullName}</span>
        </div>
      );
    },
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
        <Badge variant={"accent"} className="rounded-md capitalize">
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
    cell: () => {
      return (
        <div className="flex justify-center">
          <Button variant={"outline"} size={"sm"}>
            View Details
          </Button>
          <Button variant={"success"} size={"sm"}>
            Approve
          </Button>
        </div>
      );
    },
  },
];
