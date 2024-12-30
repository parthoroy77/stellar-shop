import { IShippingAddress } from "@repo/utils/types";
import { Badge, PhoneDisplay } from "@ui/index";
import ShippingAddressActions from "./shipping-address-actions";

const EditableShippingAddressCard = ({ address }: { address: IShippingAddress }) => {
  return (
    <div className="hover:bg-accent/30 relative space-y-3 rounded-lg border px-5 py-4 transition-all duration-300">
      <div className="text-accent-foreground space-y-1">
        <div>
          <Badge variant={"accent"} className="rounded-md">
            {address.type}
          </Badge>
        </div>
        <h3 className="text-primary-foreground text-lg font-semibold">{address.fullName}</h3>
        <PhoneDisplay value={address.phoneNumber} className="text-sm font-medium" />
        <h5 className="text-xs">{address.fullAddress}</h5>
      </div>
      <div className="absolute -top-0.5 right-2 space-x-2">
        <ShippingAddressActions id={address.id} />
      </div>
    </div>
  );
};

export default EditableShippingAddressCard;
