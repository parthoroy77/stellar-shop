import { getMyWishlist } from "@/actions/wishlist";
import BreadcrumbMenu from "@/components/ui/breadcrumb-menu";
import WishlistMobileView from "./components/wishlist-mobile-view";
import WishlistWebView from "./components/wishlist-web-view";

const WishlistPage = async () => {
  const wishlistItems = await getMyWishlist();

  return (
    <section className="space-y-3 py-5">
      <BreadcrumbMenu items={[{ label: "Wishlist", href: "/wishlist" }]} />
      {/* Desktop View */}
      <WishlistWebView wishlistItems={wishlistItems} />
      {/* Mobile View */}
      <WishlistMobileView wishlistItems={wishlistItems} />
    </section>
  );
};

export default WishlistPage;
