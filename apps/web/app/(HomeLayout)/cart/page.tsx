import { getMyCart } from "@/actions/cart";
import CartActions from "@/components/Cart/cart-actions";
import CartItem from "@/components/Cart/cart-item";
import CartSummary from "@/components/Cart/cart-summary";
import FreeShippingBanner from "@/components/Cart/free-shipping-banner";
import BreadcrumbMenu from "@/components/ui/breadcrumb-menu";
import { TCartItem } from "@repo/utils/types";

const CartPage = async () => {
  const cartItems = await getMyCart();
  return (
    <section className="space-y-3 py-5">
      <BreadcrumbMenu items={[{ label: "Cart", href: "/cart" }]} />
      <FreeShippingBanner currentTotal={100} freeShippingThreshold={200} />
      <div className="flex w-full flex-col gap-8 *:rounded-md lg:flex-row">
        <div className="lg:w-[75%]">
          {/* promotion for free delivery */}
          <CartActions />
          <div className="divide-primary last:border-b-primary divide-y last:border-b">
            {cartItems.map((cartItem, i) => (
              <CartItem key={i} cartItem={cartItem as TCartItem} />
            ))}
          </div>
        </div>
        <CartSummary />
      </div>
    </section>
  );
};

export default CartPage;
