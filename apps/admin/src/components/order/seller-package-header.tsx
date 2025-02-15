import { toNormalCase } from "@repo/utils/functions";
import { TSeller } from "@repo/utils/types";
import { Badge } from "@ui/index";
import React from "react";
interface Props {
  seller: TSeller;
  status: string;
}
const SellerPackageHeader: React.FC<Props> = ({ seller, status }) => {
  return (
    <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2">
        <h6 className="text-accent-foreground text-xs font-medium">Seller & Shipped By</h6>
        <div className="flex items-center gap-1">
          <img
            alt={seller?.shopName}
            className="size-[25px]"
            src={
              seller?.logo?.fileSecureUrl ||
              "https://res.cloudinary.com/dx0iiqjf4/image/upload/v1735808264/shopMedia/nrpn006yyxcdjm8skkzn.png"
            }
          />
          <h5 className="text-primary-foreground text-sm font-semibold">{seller?.shopName}</h5>
        </div>
      </div>
      <div className="text-accent-foreground flex items-center gap-2 text-xs font-medium">
        <span>Seller Product Status: </span>
        <Badge variant={"accent"} className="rounded-md">
          {toNormalCase(status)}
        </Badge>
      </div>
    </div>
  );
};

export default SellerPackageHeader;
