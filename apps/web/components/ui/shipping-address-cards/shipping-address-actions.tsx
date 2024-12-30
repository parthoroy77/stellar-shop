"use client";
import { deleteShippingAddress, updateShippingAddress } from "@/actions/address";
import AddShippingAddressModalForm from "@/components/Forms/Profile/shipping-address-modal-form";
import { IShippingAddress } from "@repo/utils/types";
import { AppButton } from "@ui/index";
import { useTransition } from "react";
import { LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";

const ShippingAddressActions = ({ address }: { address: IShippingAddress }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteShippingAddress(address.id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
  return (
    <>
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
      <AddShippingAddressModalForm
        submitHandler={(data) => updateShippingAddress(address.id, data)}
        addressData={address}
        isUpdate
      />
    </>
  );
};

export default ShippingAddressActions;
