"use client";
import { addShippingAddress, getAllShippingAddresses } from "@/actions/address";
import { updateUserCheckoutData } from "@/actions/checkout";
import { useQueryData } from "@repo/tanstack-query";
import { RadioGroup, RadioGroupItem } from "@ui/index";
import AddShippingAddressModalForm from "../Forms/Profile/shipping-address-modal-form";
import ShippingAddressCard from "../ui/shipping-address-cards/shipping-address-card";
import ShippingAddressCardSkeleton from "../ui/shipping-address-cards/shipping-address-card-skeleton";

const ShippingAndBilling = ({ selectedShippingAddress }: { selectedShippingAddress?: number | null }) => {
  const { data = [], isFetching } = useQueryData(["shipping-addresses"], () => getAllShippingAddresses(), {
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  });
  const handleUpdate = async (value: string) => {
    await updateUserCheckoutData({ type: "shippingAddressUpdate", shippingAddressId: +value });
  };
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <h3 className="text-primary-foreground text-lg font-medium">Select Shipping & Billing Address</h3>
        <AddShippingAddressModalForm isUpdate={false} submitHandler={(data) => addShippingAddress(data)} />
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {!isFetching ? (
          data?.length > 0 ? (
            data?.map((address) => (
              <RadioGroup
                onValueChange={handleUpdate}
                key={address.id}
                defaultValue={selectedShippingAddress?.toString()}
                className="relative"
              >
                <ShippingAddressCard address={address} />
                <RadioGroupItem className="absolute bottom-2 right-2" value={address.id.toString()} />
              </RadioGroup>
            ))
          ) : (
            <div className="col-span-3 flex h-24 items-center justify-center">
              <h4>No Address found</h4>
            </div>
          )
        ) : (
          <ShippingAddressCardSkeleton />
        )}
      </div>
    </div>
  );
};

export default ShippingAndBilling;
