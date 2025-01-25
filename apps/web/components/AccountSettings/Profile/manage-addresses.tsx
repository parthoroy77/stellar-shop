import { addShippingAddress, getAllShippingAddresses } from "@/actions/address";
import AddShippingAddressModalForm from "@/components/Forms/Profile/shipping-address-modal-form";
import EditableShippingAddressCard from "@/components/ui/shipping-address-cards/editable-shipping-address-card";

const ManageAddresses = async () => {
  const addresses = await getAllShippingAddresses();

  return (
    <div className="grid flex-grow grid-cols-12 gap-3">
      <div className="col-span-12 lg:col-span-3">
        <h3 className="text-lg font-medium">Manage Addresses</h3>
        <span className="text-accent-foreground text-wrap text-sm">Here you can manage all your addresses.</span>
      </div>
      <div className="col-span-10 grid gap-3 lg:col-span-7 lg:grid-cols-2">
        {addresses.length > 0 ? (
          addresses.map((address) => <EditableShippingAddressCard address={address} key={address.id} />)
        ) : (
          <div className="text-accent-foreground col-span-2 text-center">No address added yet!</div>
        )}
      </div>
      <div className="col-span-2 flex items-start justify-end">
        <AddShippingAddressModalForm submitHandler={addShippingAddress} isUpdate={false} />
      </div>
    </div>
  );
};

export default ManageAddresses;
