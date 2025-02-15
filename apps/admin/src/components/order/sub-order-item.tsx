import { ISubOrder, SubOrderStatus } from "@repo/utils/types";
import { OrderItemSummary, SubOrderSummary } from "@ui/index";
import SellerPackageHeader from "./seller-package-header";
import ShippingOption from "./shipping-option";

const SubOrderItem = ({
  seller,
  status,
  shippingOption,
  discountAmount,
  totalAmount,
  netAmount,
  subOrderItems,
}: ISubOrder) => {
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
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
        <div className="flex-1 rounded-md border">
          <OrderItemSummary items={subOrderItems} />
        </div>
        <div className="space-y-3 *:rounded-md *:border *:px-4 *:py-3 lg:w-[30%]">
          <SubOrderSummary
            discount={discountAmount}
            total={totalAmount}
            netAmount={netAmount}
            totalItem={subOrderItems.length}
          />
          <ShippingOption shippingOption={shippingOption} />
        </div>
      </div>
    </div>
  );
};

export default SubOrderItem;
