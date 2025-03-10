import ProductHeaderSection from "@/components/SearchAndCategoryPage/product-header-section";
import ProductListing from "@/components/SearchAndCategoryPage/product-listing";
import SideFilters from "@/components/SearchAndCategoryPage/side-filters";
import BreadcrumbMenu from "@/components/ui/breadcrumb-menu";

const items = [
  { href: "#", label: "Fashion" },
  { href: "#", label: "Kids Clothings" },
  { href: "#", label: "Kids Accessories" },
];

const CategoryPage = () => {
  return (
    <section className="space-y-5">
      <BreadcrumbMenu items={items} />
      <div className="flex gap-5">
        {/* Left Side Filters */}
        <SideFilters mobileView={false} />
        {/* Right section */}
        <div className="w-full space-y-5 lg:w-[80%]">
          {/* Top Header section */}
          <ProductHeaderSection />
          {/* Product Listings */}
          <ProductListing isDemo products={[]} />
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
