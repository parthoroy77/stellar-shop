import { TOrder } from "@repo/utils/types";
import { Badge, PhoneDisplay } from "@ui/index";
import { LuUser2 } from "react-icons/lu";

export const OrderShippingAddress = ({ address }: { address: TOrder["orderShippingAddress"] }) => {
  const { city, country, fullAddress, fullName, phoneNumber, type, zipCode, state } = address[0] || {};
  return (
    <div>
      <h4 className="font-medium">Shipping Address</h4>
      <div className="relative space-y-3 rounded-lg duration-300">
        <div className="text-accent-foreground space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-primary-foreground flex w-36 items-center gap-1 truncate font-semibold">
              <LuUser2 />
              <span>{fullName} </span>
            </h3>
            <Badge variant={"accent"} className="rounded-md font-medium capitalize">
              {type?.toLowerCase()}
            </Badge>
          </div>
          <PhoneDisplay value={phoneNumber!} className="text-primary-foreground text-xs font-medium" />
          <h5 className="text-sm">
            <b>Address:</b>{" "}
            <span>
              {fullAddress}, {state}, {city}, {country}, {zipCode}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};
