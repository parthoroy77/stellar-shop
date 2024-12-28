import { TProduct } from "@repo/utils/types";
import { Button, Checkbox } from "@ui/index";
import { ColumnDef } from "@ui/tanstack-table";
import { AiOutlineSortAscending } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
import { LuDollarSign } from "react-icons/lu";
import { PendingProductDataTableAction } from "./data-table-action";

export const columns: ColumnDef<TProduct>[] = [
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
        <div className="flex w-[150px] gap-3 px-3 py-1 text-sm capitalize lg:items-center">
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
    id: "category",
    header: () => {
      return (
        <div>
          <span>Collection Name</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 pl-1 capitalize lg:items-center">
          <span className="text-accent-foreground rounded-md text-xs font-medium capitalize lg:text-sm">
            {row?.original.categories[0].category.categoryName}
          </span>
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
        <div className="flex gap-3 pl-2 capitalize lg:items-center">
          <span className="text-accent-foreground rounded-md text-xs font-bold uppercase lg:text-sm">
            {row?.original.sku}
          </span>
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
          <BsBox size={15} className="mt-0.5" />
          <span className="text-accent-foreground rounded-md text-xs font-bold uppercase lg:text-base">
            {row?.original.stock}
          </span>
        </div>
      );
    },
  },
  {
    id: "uploadedBy",
    header: () => {
      return (
        <div>
          <span>Uploaded By</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 lg:items-center">
          <img
            className="bg-accent/40 size-9 rounded-md border object-contain object-center"
            src={
              row?.original?.seller.logo.fileUrl ||
              "https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-2/assets/product-1-CnD-btSp.png"
            }
            alt={`${row.getValue("productName")} Image`}
          />
          <span className="text-primary-foreground truncate text-xs font-semibold lg:text-sm">
            {row?.original.seller.shopName}
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
      return <PendingProductDataTableAction row={row} />;
    },
  },
];
