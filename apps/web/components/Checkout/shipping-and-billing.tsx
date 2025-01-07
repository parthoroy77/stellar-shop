"use client";
import { addShippingAddress, getAllShippingAddresses } from "@/actions/address";
import { useQueryData } from "@repo/tanstack-query";
import { RadioGroup, RadioGroupItem } from "@ui/index";
import AddShippingAddressModalForm from "../Forms/Profile/shipping-address-modal-form";
import ShippingAddressCard from "../ui/shipping-address-cards/shipping-address-card";
import ShippingAddressCardSkeleton from "../ui/shipping-address-cards/shipping-address-card-skeleton";

const ShippingAndBilling = () => {
  const { data = [], isFetching } = useQueryData(["shipping-addresses"], () => getAllShippingAddresses(), {
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  });
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <h3 className="text-primary-foreground text-lg font-medium">Select Shipping & Billing Address</h3>
        <AddShippingAddressModalForm isUpdate={false} submitHandler={(data) => addShippingAddress(data)} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {!isFetching ? (
          data?.length > 0 ? (
            data?.map((address) => (
              <RadioGroup key={address.id} className="relative">
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
