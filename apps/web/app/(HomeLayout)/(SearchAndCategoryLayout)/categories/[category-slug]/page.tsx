import ProductListing from "@/components/SearchAndCategoryPage/product-listing";
import SideFilters from "@/components/SearchAndCategoryPage/side-filters";
import BreadcrumbMenu from "@/components/ui/breamcrumb-menu";
const items = [
  { href: "#", label: "Categories" },
  { href: "#", label: "Fashion" },
  { href: "#", label: "Kids Clothings" },
  { href: "#", label: "Kids Accessories" },
];
const CategoryPage = () => {
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

export default CategoryPage;
