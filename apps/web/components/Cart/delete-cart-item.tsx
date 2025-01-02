"use client";
import { deleteCartItem } from "@/actions/cart";
import { useCartContext } from "@/contexts/cart-context";
import { AppButton } from "@ui/index";
import { useTransition } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "sonner";
const DeleteCartItem = ({ cartItemId }: { cartItemId: number }) => {
  const [isPending, startTransition] = useTransition();
  const { invalidateCart } = useCartContext();
  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteCartItem(cartItemId);
      if (result.success) {
        await invalidateCart();
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
  return (
    <AppButton
      loading={isPending}
      hideElement={isPending}
      onClick={handleDelete}
      variant={"accent"}
      size={"sm"}
      className="h-fit w-fit border p-1 lg:p-2"
    >
      <RiDeleteBinLine className="text-sm lg:text-xl" />
    </AppButton>
  );
};

export default DeleteCartItem;
