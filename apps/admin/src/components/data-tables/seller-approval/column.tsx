import { TSeller } from "@repo/utils/types";
import { Badge, Button, Checkbox, PhoneDisplay } from "@ui/index";
import { ColumnDef } from "@ui/tanstack-table";
import { AiOutlineSortAscending } from "react-icons/ai";
import SellerApprovalDataTableAction from "./data-table-action";
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
        <div className="w-fit text-start">
          <Button
            variant="ghost"
            size={"sm"}
            className="h-fit px-3 py-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Shop Name
            <AiOutlineSortAscending className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex w-[200px] gap-3 py-1 text-sm capitalize lg:items-center">
          <img
            className="bg-accent size-9 rounded-md border object-contain object-center"
            src={
              row?.original?.logo?.fileUrl ||
              "https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-2/assets/product-1-CnD-btSp.png"
            }
            alt={`${row.getValue("shopName")} Shop Image`}
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
        <div>
          <span>Owner Name</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 capitalize lg:items-center">
          <span className="text-xs font-medium lg:text-sm">{row?.original.user?.fullName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "userId",
    header: () => {
      return (
        <div>
          <span>User email</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 lg:items-center">
          <span className="text-xs lg:text-sm">{row?.original.user?.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contactNumber",
    header: () => {
      return (
        <div className="text-start">
          <span>Contact Number</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-start gap-3 text-sm capitalize lg:items-center">
          <PhoneDisplay value={row?.original?.contactNumber} className="text-xs font-medium" />
        </div>
      );
    },
  },
  {
    id: "country",
    header: () => {
      return (
        <div className="text-start">
          <span>Country</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-primary text-start text-xs font-medium">
        <Badge variant={"accent"}>{row.original?.user?.addresses[0]?.country}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => {
      return (
        <div className="text-start">
          <span>Status</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-start">
        <Badge variant={"outline"} className="text-secondary border-secondary rounded-md capitalize">
          {(row.getValue("status") as string)?.toLowerCase()}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => {
      return (
        <div className="text-start">
          <span>Actions</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return <SellerApprovalDataTableAction row={row} />;
    },
  },
];
