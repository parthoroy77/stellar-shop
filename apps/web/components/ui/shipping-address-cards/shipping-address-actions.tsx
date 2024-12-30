"use client";
import { deleteShippingAddress } from "@/actions/address";
import { AppButton, Button } from "@ui/index";
import { useTransition } from "react";
import { LuPenLine, LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";

const ShippingAddressActions = ({ id }: { id: number }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteShippingAddress(id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="space-x-2">
      <AppButton
        onClick={handleDelete}
        loading={isPending}
        hideElement={isPending}
        variant={"destructive"}
        size={"icon"}
        className="size-8 rounded-full border"
      >
        <LuTrash2 size={17} />
      </AppButton>
      <Button variant={"ghost"} size={"icon"} className="size-8 rounded-full border">
        <LuPenLine size={17} />
      </Button>
    </div>
  );
};

export default ShippingAddressActions;
