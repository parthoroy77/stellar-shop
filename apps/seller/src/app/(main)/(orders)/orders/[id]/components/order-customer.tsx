import { TOrder } from "@repo/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/index";
import { LuUser2 } from "react-icons/lu";

const OrderCustomer = ({ user }: { user: TOrder["user"] }) => {
  return (
    <div>
      <h4 className="font-medium">Customer</h4>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LuUser2 size={18} color="gray" />
          <h3 className="text-lg font-medium">{user.fullName}</h3>
        </div>
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={user.fullName} className="border" />
          <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default OrderCustomer;
