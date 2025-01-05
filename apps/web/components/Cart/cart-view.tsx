import { groupCartItemsBySeller } from "@/utils/group-cart-items-by-seller";
import { TCartItem } from "@repo/utils/types";
import { Checkbox } from "@ui/index";
import Image from "next/image";
import CartActions from "./cart-actions";
import CartItem from "./cart-item";
import CartSummary from "./cart-summary";

const CartView = ({ cartItems }: { cartItems: TCartItem[] }) => {
  // Group cart items by seller
  const groupedItems = groupCartItemsBySeller(cartItems);

  return (
    <div className="flex w-full flex-col gap-5 *:rounded-md lg:flex-row">
      <div className="h-fit space-y-3 lg:w-[75%]">
        <CartActions />
        {Object.values(groupedItems).map((groupedItem, idx) => (
          <div key={idx} className="divide-y-2 rounded-md border-2 *:px-4 *:py-3 *:lg:px-6">
            <div className="flex items-center gap-2">
              <Checkbox />
              {/* TODO: Redirect to seller  */}
              <div className="flex items-center gap-2">
                <Image
                  width={30}
                  height={30}
                  alt={groupedItem.seller.shopName}
                  src={groupedItem.seller.logo.fileSecureUrl}
                />
                <h5> {groupedItem.seller.shopName}</h5>
              </div>
            </div>
            {groupedItem.items.map((cartItem, i) => (
              <CartItem key={i} cartItem={cartItem as TCartItem} />
            ))}
          </div>
        ))}
      </div>
      <CartSummary />
    </div>
  );
};

export default CartView;
