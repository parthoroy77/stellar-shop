import { TSubOrder } from "@/actions/order.action";
import { OrderPaymentStatus } from "@repo/utils/types";
import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from "@ui/index";
import { ColumnDef } from "@ui/tanstack-table";
import moment from "moment";
import { LuDollarSign, LuFileText } from "react-icons/lu";
import { SlMagnifierAdd } from "react-icons/sl";

export const columns: ColumnDef<TSubOrder>[] = [
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
      <div className="text-accent-foreground w-32 truncate font-medium">
        <Button className="px-0" variant={"link"}>
          {row.original.order.uniqueId}
        </Button>
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
        <span className="text-accent-foreground text-sm font-medium">{row.original.subOrderItems} Item</span>
      </div>
    ),
  },
  {
    accessorKey: "netAmount",
    header: () => {
      return (
        <div>
          <span>Order Amount</span>
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
          <AvatarImage src={row.original.order.user.avatarUrl} alt={row.original.order.user.fullName} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <h5 className="text-sm font-medium">{row.original.order.user.fullName}</h5>
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
      <div className="flex items-center gap-2 truncate capitalize">{row.original.order.paymentMethod.name}</div>
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
            row.original.order.paymentStatus === OrderPaymentStatus.PENDING
              ? "accent"
              : row.original.order.paymentStatus === OrderPaymentStatus.PAID
                ? "success"
                : "destructive"
          }
        >
          {row.original.order.paymentStatus}
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
        <Badge variant={"success"} className="rounded-md capitalize">
          {(row.original.order.status as string)?.toLowerCase()}
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
    cell: () => {
      return (
        <div className="flex w-fit justify-center gap-1">
          <Button size={"sm"} className="flex h-7 w-fit gap-1" variant={"link"}>
            <SlMagnifierAdd />
            View
          </Button>
          <Button size={"sm"} className="h-7 w-fit min-w-16 border" variant={"accent"}>
            Packed
          </Button>
        </div>
      );
    },
  },
];
