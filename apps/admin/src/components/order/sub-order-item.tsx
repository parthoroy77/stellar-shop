import { ISubOrder, SubOrderStatus } from "@repo/utils/types";
import SellerPackageHeader from "./seller-package-header";

const SubOrderItem = ({ seller, status }: ISubOrder) => {
  const sellerStatus = [
    SubOrderStatus.PROCESSING,
    SubOrderStatus.PACKED,
    SubOrderStatus.CONFIRMED,
    SubOrderStatus.SHIPPED,
  ].includes(status)
    ? status
    : "Seller handled successfully";
  return (
    <div>
      <SellerPackageHeader seller={seller} status={sellerStatus} />
    </div>
  );
};

export default SubOrderItem;
