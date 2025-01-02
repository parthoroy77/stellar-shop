import { getMyCart } from "@/actions/cart";
import CartActions from "@/components/Cart/cart-actions";
import CartItem from "@/components/Cart/cart-item";
import CartSummary from "@/components/Cart/cart-summary";
import EmptyCart from "@/components/Cart/empty-cart";
import FreeShippingBanner from "@/components/Cart/free-shipping-banner";
import BreadcrumbMenu from "@/components/ui/breadcrumb-menu";
import { TCartItem } from "@repo/utils/types";

const CartPage = async () => {
  const cartItems = await getMyCart();
  return (
    <section className="space-y-3 py-5">
      <BreadcrumbMenu items={[{ label: "Cart", href: "/cart" }]} />
      <FreeShippingBanner currentTotal={100} freeShippingThreshold={200} />
      {cartItems.length > 0 ? (
        <div className="flex w-full flex-col gap-8 *:rounded-md lg:flex-row">
          <div className="h-fit divide-y-2 border-2 shadow-sm *:px-4 *:py-3 lg:w-[75%] *:lg:px-6">
            {/* promotion for free delivery */}
            <CartActions />
            {cartItems.map((cartItem, i) => (
              <CartItem key={i} cartItem={cartItem as TCartItem} />
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
