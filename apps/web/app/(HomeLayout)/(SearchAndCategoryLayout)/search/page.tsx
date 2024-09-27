import ProductHeaderSection from "@/components/SearchAndCategoryPage/product-header-section";
import ProductListing from "@/components/SearchAndCategoryPage/product-listing";
import SideFilters from "@/components/SearchAndCategoryPage/side-filters";
import BreadcrumbMenu from "@/components/ui/breadcrumb-menu";
import { Suspense } from "react";
const items = [{ href: "#", label: "Search Result" }];

const SearchPage = async () => {
  return (
    <section className="space-y-5">
      <BreadcrumbMenu items={items} />
      <Suspense fallback={<div>loading</div>}>
        <div className="flex gap-5">
          {/* Left Side Filters */}
          <SideFilters mobileView={false} />
          {/* Right section */}
          <div className="w-full space-y-5 lg:w-[80%]">
            {/* Top Header section */}
            <ProductHeaderSection />
            {/* Product Listings */}
            <ProductListing />
          </div>
        </div>
      </Suspense>
    </section>
  );
};

export default SearchPage;
