import { IShippingAddress } from "@repo/utils/types";
import { Badge, PhoneDisplay } from "@ui/index";
import React from "react";

const ShippingAddressCard = ({ address }: { address: IShippingAddress }) => {
  return (
    <div className="hover:bg-accent/30 relative space-y-3 rounded-lg border bg-white px-5 py-4 shadow-sm transition-all duration-300">
      <div className="text-accent-foreground cursor-pointer space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-primary-foreground w-36 truncate font-semibold">{address.fullName} </h3>
          <Badge variant={"accent"} className="rounded-md font-medium capitalize">
            {address.type.toLocaleLowerCase()}
          </Badge>
        </div>
        <PhoneDisplay value={address.phoneNumber} className="text-primary-foreground text-xs font-medium" />
        <h5 className="text-xs">
          <b>Address:</b>{" "}
          <span>
            {address.fullAddress}, {address.state}, {address.city}, {address.country}
          </span>
        </h5>
      </div>
    </div>
  );
};
export default ShippingAddressCard;
