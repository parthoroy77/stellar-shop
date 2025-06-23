import { getProductBySearch, TProductFilters } from "@/actions/product";
import ProductHeaderSection from "@/components/SearchAndCategoryPage/product-header-section";
import ProductListing from "@/components/SearchAndCategoryPage/product-listing";
import SideFilters from "@/components/SearchAndCategoryPage/side-filters";
import BreadcrumbMenu from "@/components/ui/breadcrumb-menu";
import { Suspense } from "react";

const items = [{ href: "#", label: "Search Result" }];

const SearchPage = async ({ searchParams }: { searchParams: TProductFilters }) => {
  const {
    q = "",
    brands = "",
    categories = "",
    status = "",
    limit = "12",
    page = "1",
    sortBy = "",
    order = "",
    min = "",
    max = "",
  } = searchParams;

  const result = await getProductBySearch({
    q,
    brands,
    categories,
    status,
    limit,
    page,
    sortBy,
    order,
    min,
    max,
  });

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
            <ProductHeaderSection totalResults={result.data?.length} />
            {/* Product Listings */}
            <ProductListing isDemo={false} products={result?.data || []} />
          </div>
        </div>
      </Suspense>
    </section>
  );
};

export default SearchPage;
