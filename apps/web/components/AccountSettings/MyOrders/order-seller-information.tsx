import { toNormalCase } from "@repo/utils/functions";
import { SubOrderStatus, TSeller } from "@repo/utils/types";
import { Badge } from "@ui/index";
import Image from "next/image";

const OrderSellerInformation = ({
  seller,
  packageNumber,
  status,
}: {
  seller: TSeller;
  status: SubOrderStatus;
  packageNumber: number;
}) => {
  return (
    <div className="flex flex-col items-start sm:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium sm:text-base">Package {packageNumber}</span>
        {status && (
          <Badge
            variant={status === "CANCELED" ? "destructive" : status === "DELIVERED" ? "success" : "accent"}
            className="rounded-md capitalize"
          >
            {toNormalCase(status).toLowerCase()}
          </Badge>
        )}
      </div>
      <div className="flex cursor-pointer items-center justify-end gap-2">
        <h6 className="text-accent-foreground text-xs font-medium">Seller & Shipped By</h6>
        <div className="flex items-center gap-1">
          <Image
            width={20}
            height={20}
            alt={"groupedItem.seller.shopName"}
            src={
              seller.logo.fileSecureUrl ||
              "https://res.cloudinary.com/dx0iiqjf4/image/upload/v1735808264/shopMedia/nrpn006yyxcdjm8skkzn.png"
            }
          />
          <span className="text-primary-foreground text-xs font-semibold sm:text-sm">{seller.shopName}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSellerInformation;
