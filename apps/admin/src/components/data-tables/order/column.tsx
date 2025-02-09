import { toNormalCase } from "@repo/utils/functions";
import { OrderPaymentStatus, TOrder } from "@repo/utils/types";
import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from "@ui/index";
import { ColumnDef } from "@ui/tanstack-table";
import moment from "moment";
import { LuDollarSign, LuFileText } from "react-icons/lu";
import OrdersDataTableActions from "./data-table-action";

export type TOrderResponse = TOrder & {
  totalSubOrders: number;
  totalOrderItems: number;
};

export const columns: ColumnDef<TOrderResponse>[] = [
  {
    id: "orderId",
    header: () => {
      return (
        <div>
          <span>Order ID</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="w-32 truncate text-sm font-medium text-black">
        <span>{row.original.uniqueId}</span>
      </div>
    ),
  },
  {
    accessorKey: "orderPlacedAt",
    header: () => {
      return (
        <div>
          <span>Order Date</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-accent-foreground w-[150px] font-medium">
        <span className="w-full truncate">{moment(row.original.orderPlacedAt).format("h:mm a, MMM Do, YYYY")}</span>
      </div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: () => {
      return (
        <div>
          <span>Order Subtotal</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center font-semibold">
        <LuDollarSign color="green" />
        <span>{row.original.totalAmount} </span>
      </div>
    ),
  },
  {
    accessorKey: "discountAmount",
    header: () => {
      return (
        <div>
          <span>Discount</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-destructive flex items-center font-semibold">
        <LuDollarSign />
        <span className="text-destructive">{row.original.discountAmount} </span>
      </div>
    ),
  },
  {
    accessorKey: "shippingAmount",
    header: () => {
      return (
        <div>
          <span>Total Shipping</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center font-semibold">
        <LuDollarSign color="green" />
        <span>{row.original.shippingAmount} </span>
      </div>
    ),
  },
  {
    accessorKey: "netAmount",
    header: () => {
      return (
        <div>
          <span>Net Order Amount</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center font-semibold">
        <LuDollarSign color="green" />
        <span>{row.original.netAmount} </span>
      </div>
    ),
  },
  {
    id: "totalItem",
    header: () => {
      return (
        <div>
          <span>Total Items</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div>
        <span className="text-accent-foreground text-sm font-medium">{row.original.totalOrderItems} Item</span>
      </div>
    ),
  },
  {
    id: "sellers",
    header: () => {
      return (
        <div>
          <span>Total Seller</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div>
        <span className="text-accent-foreground text-sm font-medium">{row.original.totalSubOrders} Seller</span>
      </div>
    ),
  },

  {
    id: "Buyer Name",
    header: () => {
      return (
        <div>
          <span>Buyer Name</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex w-32 items-center gap-2 capitalize">
        <Avatar>
          <AvatarImage src={row.original.user.avatarUrl} alt={row.original.user.fullName} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <h5 className="text-sm font-medium">{row.original.user.fullName}</h5>
        </div>
      </div>
    ),
  },
  {
    id: "Payment Method",
    header: () => {
      return (
        <div>
          <span>Payment Method</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 truncate capitalize">{row.original.paymentMethod.name}</div>
    ),
  },
  {
    id: "Payment Status",
    header: () => {
      return (
        <div>
          <span className="font-semibold">Payment Status</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 capitalize">
        <Badge
          className="rounded-md font-normal"
          variant={
            row.original.paymentStatus === OrderPaymentStatus.PENDING
              ? "accent"
              : row.original.paymentStatus === OrderPaymentStatus.PAID
                ? "success"
                : "destructive"
          }
        >
          {row.original.paymentStatus}
        </Badge>
      </div>
    ),
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
    cell: ({ row }) => (
      <div>
        <Badge variant={"success"} className="truncate rounded-md capitalize">
          {toNormalCase(row.original.status)}
        </Badge>
      </div>
    ),
  },
  {
    id: "invoice",
    header: () => {
      return (
        <div>
          <span>Invoice</span>
        </div>
      );
    },
    cell: () => (
      <Button variant={"link"} className="flex h-7 items-center gap-2 p-0">
        <LuFileText size={18} />
        <span>Download </span>
      </Button>
    ),
  },
  {
    id: "actions",
    header: () => {
      return (
        <div>
          <span>Actions</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return <OrdersDataTableActions row={row} />;
    },
  },
];
