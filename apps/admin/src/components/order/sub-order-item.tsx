import { ISubOrder, SubOrderStatus } from "@repo/utils/types";
import { OrderItemSummary, SubOrderSummary } from "@ui/index";
import SellerPackageHeader from "./seller-package-header";

const SubOrderItem = ({ seller, status, discountAmount, totalAmount, netAmount, subOrderItems }: ISubOrder) => {
  const sellerStatus = [
    SubOrderStatus.PROCESSING,
    SubOrderStatus.PACKED,
    SubOrderStatus.CONFIRMED,
    SubOrderStatus.SHIPPED,
  ].includes(status)
    ? status
    : "Seller handled successfully";
  return (
    <div className="space-y-3">
      <SellerPackageHeader seller={seller} status={sellerStatus} />
      <div className="flex items-start gap-3">
        <div className="flex-1 rounded-md border">
          <OrderItemSummary items={subOrderItems} />
        </div>
        <div className="w-[30%] rounded-md border px-4 py-3">
          <SubOrderSummary
            discount={discountAmount}
            total={totalAmount}
            netAmount={netAmount}
            totalItem={subOrderItems.length}
          />
        </div>
      </div>
    </div>
  );
};

export default SubOrderItem;
