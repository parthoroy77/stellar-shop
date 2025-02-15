import { ISubOrderItem } from "@repo/utils/types";
import { OrderItem } from "./order-item";

export const OrderItemSummary = ({ items }: { items: ISubOrderItem[] }) => {
  return (
    <div className="!space-y-0 divide-y !p-0">
      <h4 className="px-5 py-3 font-medium">
        Item Summary <span className="text-sm">({items.length} items)</span>
      </h4>
      <div className="divide-y *:px-5 *:py-2">
        {items.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
