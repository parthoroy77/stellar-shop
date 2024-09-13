import ProductListing from "@/components/SearchAndCategoryPage/product-listing";
import SideFilters from "@/components/SearchAndCategoryPage/side-filters";
import BreadcrumbMenu from "@/components/ui/breadcrumb-menu";
const items = [{ href: "#", label: "Search Result" }];

const SearchPage = async () => {
  return (
    <section className="space-y-5">
      <BreadcrumbMenu items={items} />
      <div className="flex gap-5">
        <SideFilters />
        <ProductListing />
      </div>
    </section>
  );
};

export default SearchPage;
