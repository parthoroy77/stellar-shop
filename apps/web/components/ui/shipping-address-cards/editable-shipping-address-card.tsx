import { IShippingAddress } from "@repo/utils/types";
import { Badge, PhoneDisplay } from "@ui/index";
import ShippingAddressActions from "./shipping-address-actions";

const EditableShippingAddressCard = ({ address }: { address: IShippingAddress }) => {
  return (
    <div className="hover:bg-accent/30 relative space-y-3 rounded-lg border px-5 py-4 transition-all duration-300">
      <div className="text-accent-foreground cursor-pointer space-y-1">
        <div>
          <Badge variant={"accent"} className="rounded-md">
            {address.type}
          </Badge>
        </div>
        <h3 className="text-primary-foreground text-lg font-semibold">{address.fullName}</h3>
        <PhoneDisplay value={address.phoneNumber} className="text-sm font-medium" />
        <h5 className="flex text-xs">
          {address.fullAddress}, {address.state}, {address.city}, {address.country}
        </h5>
      </div>
      <div className="absolute -top-0.5 right-2 flex gap-2">
        <ShippingAddressActions address={address} />
      </div>
    </div>
  );
};

export default EditableShippingAddressCard;
