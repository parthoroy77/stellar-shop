import ProductListing from "@/components/SearchAndCategoryPage/product-listing";
import SideFilters from "@/components/SearchAndCategoryPage/side-filters";

const CategoryPage = () => {
  return (
    <div className="flex gap-5">
      <SideFilters />
      <ProductListing />
    </div>
  );
};

export default CategoryPage;
