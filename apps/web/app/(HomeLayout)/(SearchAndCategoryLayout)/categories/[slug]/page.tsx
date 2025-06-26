import { getProductByCategory, TProductFilters } from "@/actions/product";
import ProductHeaderSection from "@/components/SearchAndCategoryPage/product-header-section";
import ProductListing from "@/components/SearchAndCategoryPage/product-listing";
import ProductResultSkeleton from "@/components/SearchAndCategoryPage/products-result-skeleton";
import SearchPagination from "@/components/SearchAndCategoryPage/search-pagination";
import SideFilters from "@/components/SearchAndCategoryPage/side-filters";
import BreadcrumbMenu from "@/components/ui/breadcrumb-menu";
import { Suspense } from "react";

const items = [{ href: "#", label: "Categories Result" }];

const CategoryPage = async ({ searchParams, params }: { searchParams: TProductFilters; params: { slug: string } }) => {
  const {
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
  const { slug } = params;

  const result = await getProductByCategory(slug, {
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

  const meta = result.meta;
  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 0;
  return (
    <section className="space-y-5">
      <BreadcrumbMenu items={items} />
      <Suspense fallback={<ProductResultSkeleton />}>
        <div className="flex gap-5">
          {/* Left Side Filters */}
          <SideFilters mobileView={false} />
          {/* Right section */}
          <div className="w-full space-y-5 lg:w-[80%]">
            {/* Top Header section */}
            <ProductHeaderSection totalResults={result.data?.length} />
            {/* Product Listings */}
            <ProductListing isDemo={false} products={result?.data || []} />
            {/* Pagination */}
            {meta && meta.total > +limit && <SearchPagination totalPages={totalPages} defaultPage={meta.page} />}
          </div>
        </div>
      </Suspense>
    </section>
  );
};

export default CategoryPage;
