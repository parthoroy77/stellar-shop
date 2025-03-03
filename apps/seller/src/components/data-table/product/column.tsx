import { TProduct } from "@repo/utils/types";
import { Badge, Button } from "@ui/index";
import { ColumnDef } from "@ui/tanstack-table";
import moment from "moment";
import { AiOutlineSortAscending } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
import { LuDollarSign } from "react-icons/lu";
import ProductDataTableActions from "./data-table-actions";

export const columns: ColumnDef<TProduct>[] = [
  {
    accessorKey: "uniqueId",
    header: "Product Id",
    cell: ({ row }) => {
      return (
        <div className="w-fit truncate">
          <h5 className="text-secondary text-sm font-semibold">{row.original.uniqueId}</h5>
        </div>
      );
    },
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <div className="w-fit text-start">
          <Button
            variant="ghost"
            size={"sm"}
            className="h-fit px-3 py-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <AiOutlineSortAscending className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },

    cell: ({ row }) => {
      return (
        <div className="flex w-[250px] gap-3 px-1 py-1 text-sm capitalize lg:items-center">
          <img
            className="bg-accent/40 size-9 rounded-md border object-contain object-center"
            src={
              row?.original?.images[0]?.file?.fileUrl ||
              "https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-2/assets/product-1-CnD-btSp.png"
            }
            alt={`${row.getValue("productName")} Image`}
          />
          <h5 className="truncate text-sm font-medium">{row.getValue("productName")}</h5>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => {
      return (
        <div>
          <span>Price</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex w-fit items-center justify-center gap-1 rounded-md capitalize">
          <LuDollarSign />
          <span className="rounded-md text-xs font-bold uppercase lg:text-sm">{row?.original.price}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "comparePrice",
    header: () => {
      return (
        <div>
          <span>Compare Price</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex w-fit items-center justify-center gap-1 rounded-md capitalize">
          <LuDollarSign />
          <span className="rounded-md text-xs font-bold uppercase lg:text-sm">{row?.original.comparePrice}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: () => {
      return (
        <div>
          <span>Product SKU</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <span className="text-accent-foreground rounded-md text-xs font-bold uppercase">{row?.original.sku}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: () => {
      return (
        <div>
          <span>Stock</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex w-fit items-center justify-center gap-2 rounded-md capitalize">
          <BsBox size={15} className="mt-0.5 block" />
          <span className="text-accent-foreground block rounded-md text-xs font-bold uppercase lg:text-base">
            {row?.original.stock}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => {
      return (
        <div>
          <span>Status</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 capitalize">
          <Badge
            className="rounded-md font-normal"
            variant={
              row.original.status === "ACTIVE"
                ? "success"
                : row.original.status === "PENDING"
                  ? "secondary"
                  : "destructive"
            }
          >
            {row.original.status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="truncate capitalize">
          <span className="text-accent-foreground rounded-md text-xs font-bold">
            {moment(row.original.createdAt).format("DD MMMM YYYY")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      return (
        <div className="pr-4 text-end">
          <span>Actions</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return <ProductDataTableActions row={row} />;
    },
  },
];
