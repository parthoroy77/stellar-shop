import { toNormalCase } from "@repo/utils/functions";
import { TOrder } from "@repo/utils/types";
import { Badge } from "@ui/index";

const PaymentInformation = ({
  status,
  method,
}: {
  status: TOrder["paymentStatus"];
  method: TOrder["paymentMethod"];
}) => {
  return (
    <div className="space-y-2">
      <h5 className="flex justify-between text-sm font-medium">
        Payment Status
        <Badge variant={status === "UNPAID" ? "destructive" : "success"} className="rounded-md capitalize">
          {toNormalCase(status).toLowerCase()}
        </Badge>
      </h5>
      <hr />
      <h5 className="flex justify-between text-sm font-medium">
        Payment Method
        <Badge variant={"accent"} className="rounded-md capitalize">
          {method.name}
        </Badge>
      </h5>
    </div>
  );
};

export default PaymentInformation;
