import ProductListing from "@/components/SearchAndCategoryPage/product-listing";
import SideFilters from "@/components/SearchAndCategoryPage/side-filters";
import SideFiltersSkeleton from "@/components/SearchAndCategoryPage/side-filters-skeleton";
import BreadcrumbMenu from "@/components/ui/breamcrumb-menu";
const items = [
  { href: "#", label: "Categories" },
  { href: "#", label: "Fashion" },
  { href: "#", label: "Kids Clothings" },
  { href: "#", label: "Kids Accessories" },
];

const SearchPage = async () => {
  return (
    <section className="space-y-5">
      <BreadcrumbMenu items={items} />
      <div className="flex gap-5">
        <SideFiltersSkeleton />
        {/* <SideFilters /> */}
        <ProductListing />
      </div>
    </section>
  );
};

export default SearchPage;
