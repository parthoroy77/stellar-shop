import { ISubOrder } from "@repo/utils/types";
import { Badge, Button } from "@ui/index";
import { ColumnDef } from "@ui/tanstack-table";
import moment from "moment";
import { LuFileText } from "react-icons/lu";

export const columns: ColumnDef<ISubOrder>[] = [
  {
    id: "orderId",
    header: () => {
      return (
        <div className="text-right">
          <span>Order Id</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-accent-foreground text-right font-medium tracking-wider">
        <span>{row.original.order.uniqueId}</span>
      </div>
    ),
  },
  {
    accessorKey: "orderPlacedAt",
    header: () => {
      return (
        <div className="text-right">
          <span>Order Date</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-right">
        {moment(row.original.orderPlacedAt).format("h:mm a MMM DD YYYY")}
      </div>
    ),
  },
  {
    id: "totalItem",
    header: () => {
      return (
        <div className="text-right">
          <span>Total Items</span>
        </div>
      );
    },
    cell: () => <div className="flex items-center gap-2 text-right">2 Item</div>,
  },
  {
    accessorKey: "netAmount",
    header: () => {
      return (
        <div className="text-right">
          <span>Order Amount</span>
        </div>
      );
    },
    cell: ({ row }) => <div className="flex items-center gap-2 text-right">{row.original.netAmount}</div>,
  },
  {
    id: "Customer Name",
    header: () => {
      return (
        <div className="text-right">
          <span>Buyer</span>
        </div>
      );
    },
    cell: () => <div className="flex items-center gap-2 text-right capitalize">partho roy</div>,
  },
  {
    id: "Payment Method",
    header: () => {
      return (
        <div className="text-right">
          <span>Payment Method</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-right capitalize">{row.original.order.paymentMethod.name}</div>
    ),
  },
  {
    id: "Payment Status",
    header: () => {
      return (
        <div className="text-right">
          <span>Payment Status</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-right capitalize">{row.original.order.paymentStatus}</div>
    ),
  },
  {
    id: "invoice",
    header: () => {
      return (
        <div className="text-right">
          <span>Invoice</span>
        </div>
      );
    },
    cell: () => (
      <div className="flex items-center gap-2 text-right">
        <LuFileText size={18} />
        <span>Download </span>
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
    cell: () => {
      return (
        <div className="flex w-[300px] flex-col justify-center gap-1">
          <Button>View</Button>
          <Button>Packed</Button>
        </div>
      );
    },
  },
];
