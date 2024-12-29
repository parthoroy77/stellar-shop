import BreadcrumbMenu from "@/components/ui/breadcrumb-menu";
import WishlistMobileView from "./components/wishlist-mobile-view";
import WishlistWebView from "./components/wishlist-web-view";

const WishlistPage = () => {
  return (
    <section className="space-y-3 py-5">
      <BreadcrumbMenu items={[{ label: "Wishlist", href: "/wishlist" }]} />
      <div className="mx-auto">
        {/* Desktop View */}
        <WishlistWebView />
        {/* Mobile View */}
        <WishlistMobileView />
      </div>
    </section>
  );
};

export default WishlistPage;
