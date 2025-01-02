import { getMyCart } from "@/actions/cart";
import CartActions from "@/components/Cart/cart-actions";
import CartItem from "@/components/Cart/cart-item";
import CartSummary from "@/components/Cart/cart-summary";
import EmptyCart from "@/components/Cart/empty-cart";
import FreeShippingBanner from "@/components/Cart/free-shipping-banner";
import BreadcrumbMenu from "@/components/ui/breadcrumb-menu";
import { groupCartItemsBySeller } from "@/utils/group-cart-items-by-seller";
import { TCartItem } from "@repo/utils/types";
import { Checkbox } from "@ui/index";
import Image from "next/image";

const CartPage = async () => {
  const cartItems = await getMyCart();
  // Group cart items by seller
  const groupedItems = groupCartItemsBySeller(cartItems);

  return (
    <section className="space-y-3 py-5">
      <BreadcrumbMenu items={[{ label: "Cart", href: "/cart" }]} />
      {/* promotion for free delivery */}
      <FreeShippingBanner currentTotal={100} freeShippingThreshold={200} />
      {cartItems.length > 0 ? (
        <div className="flex w-full flex-col gap-8 *:rounded-md lg:flex-row">
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
                <div>
                  {groupedItem.items.map((cartItem, i) => (
                    <CartItem key={i} cartItem={cartItem as TCartItem} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <CartSummary />
        </div>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
};

export default CartPage;
