import { Avatar, AvatarFallback, AvatarImage, Button, Checkbox } from "@repo/ui";
import { getNameInitials } from "@repo/utils/functions";
import { TUser, UserActivationStatus, UserRole } from "@repo/utils/types";
import { cn } from "@ui/lib/utils";
import { ColumnDef } from "@ui/tanstack-table";
import moment from "moment";
import { AiOutlineSortAscending } from "react-icons/ai";
import { LuAtSign, LuCalendarCheck, LuCircleDotDashed, LuPen, LuSettings2, LuTrash2, LuUserCog } from "react-icons/lu";

export const column: ColumnDef<TUser>[] = [
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
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <div className="flex w-fit items-center gap-2 text-start">
          <span>Full Name</span>
          <Button
            variant="ghost"
            size={"sm"}
            className="h-fit px-0 py-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <AiOutlineSortAscending className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const name =
        (row.original.role === UserRole.SELLER ? row.original.sellerProfile?.shopName : row.original.fullName) ||
        "Anonymous User";
      const image =
        row.original.role === UserRole.SELLER ? row.original.sellerProfile?.logo.fileSecureUrl : row.original.avatarUrl;
      return (
        <div className="flex w-[200px] gap-3 py-1 text-sm capitalize lg:items-center">
          <Avatar className="size-8">
            <AvatarImage src={image} />
            <AvatarFallback>{getNameInitials(name) ?? "ST"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="truncate text-xs font-medium lg:text-sm">{name}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => {
      return (
        <div className="flex items-center gap-1">
          <LuAtSign size={16} />
          <span>Email</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 lg:items-center">
          <span className="text-primary-foreground text-xs font-medium hover:underline lg:text-sm">
            {row?.original?.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => {
      return (
        <div className="flex items-center gap-1">
          <LuUserCog size={16} />
          <span>Role</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 lg:items-center">
          <span
            className={cn(
              "bg-accent/50 rounded-md border px-2 py-1 text-xs capitalize tracking-wide",
              row?.original?.role === UserRole.ADMIN && "bg-accent/50",
              row?.original?.role === UserRole.BUYER && "bg-primary text-white",
              row?.original?.role === UserRole.SELLER && "bg-secondary text-white"
            )}
          >
            {row?.original?.role.toLowerCase()}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: () => {
      return (
        <div className="flex items-center gap-1">
          <LuCircleDotDashed size={16} />
          <span>Status</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-start">
        <div className="bg-accent/40 text-accent-foreground flex w-fit items-center gap-2 rounded-md border px-2 py-0.5 text-xs font-medium capitalize">
          <div
            className={cn(
              "size-1.5 rounded-full",
              row.original.status === UserActivationStatus.ACTIVE && "bg-green-700",
              row.original.status === UserActivationStatus.INACTIVE && "bg-blue-700",
              row.original.status === UserActivationStatus.BLOCKED && "bg-red-700"
            )}
          ></div>
          <span>{(row.getValue("status") as string)?.toLowerCase()}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => {
      return (
        <div className="flex items-center gap-1">
          <LuCalendarCheck size={16} />
          <span>Joined Date</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 lg:items-center">
          <span className="text-xs font-medium text-neutral-700">
            {moment(row?.original?.createdAt).format("DD MMM YYYY, hh:mm a")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      return (
        <div className="flex items-center gap-1">
          <LuSettings2 size={16} />
          <span>Actions</span>
        </div>
      );
    },
    cell: () => {
      return (
        <div className="flex items-center gap-2">
          <Button className="flex h-fit w-fit items-center gap-2 px-2 py-1" variant={"outline"}>
            <LuPen />
            Edit
          </Button>
          <Button className="flex h-fit w-fit items-center gap-2 px-2 py-1" variant={"destructive"}>
            <LuTrash2 />
            Delete
          </Button>
        </div>
      );
    },
  },
];
