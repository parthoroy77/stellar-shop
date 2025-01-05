import { getMyCart } from "@/actions/cart";
import CartView from "@/components/Cart/cart-view";
import EmptyCart from "@/components/Cart/empty-cart";
import FreeShippingBanner from "@/components/Cart/free-shipping-banner";
import BreadcrumbMenu from "@/components/ui/breadcrumb-menu";

const CartPage = async () => {
  const cartItems = await getMyCart();

  return (
    <section className="space-y-5 py-5">
      <BreadcrumbMenu items={[{ label: "Cart", href: "/cart" }]} />
      {/* promotion for free delivery */}
      <FreeShippingBanner currentTotal={100} freeShippingThreshold={200} />
      {cartItems.length > 0 ? <CartView cartItems={cartItems} /> : <EmptyCart />}
    </section>
  );
};

export default CartPage;
