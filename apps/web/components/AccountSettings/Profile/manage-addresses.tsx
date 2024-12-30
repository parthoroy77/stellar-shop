import AddShippingAddressModalForm from "@/components/Forms/Profile/add-shipping-address-modal-form";
import EditableShippingAddressCard from "@/components/ui/shipping-address-cards/editable-shipping-address-card";
import { serverFetcher } from "@/lib/server-fetcher";
import { IShippingAddress } from "@repo/utils/types";

const getAllShippingAddresses = async () => {
  const result = await serverFetcher<IShippingAddress[]>("/addresses/shippings", {
    next: { tags: ["shipping-addresses"] },
  });
  return result.data || [];
};

const ManageAddresses = async () => {
  const addresses = await getAllShippingAddresses();
  return (
    <div className="grid flex-grow grid-cols-12 gap-3">
      <div className="col-span-3">
        <h3 className="text-lg font-medium">Manage Addresses</h3>
        <span className="text-accent-foreground text-wrap text-sm">Here you can manage all your addresses.</span>
      </div>
      <div className="col-span-7 grid gap-3 lg:grid-cols-2">
        {addresses.length > 0 ? (
          addresses.map((address) => <EditableShippingAddressCard address={address} key={address.id} />)
        ) : (
          <div className="text-accent-foreground col-span-2 text-center">No address added yet!</div>
        )}
      </div>
      <div className="col-span-2 flex items-start justify-end">
        <AddShippingAddressModalForm />
      </div>
    </div>
  );
};

export default ManageAddresses;
