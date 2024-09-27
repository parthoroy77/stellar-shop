import MobileFilterTrigger from "./mobile-filter-trigger";
import ProductSortOptions from "./product-sort-options";

const ProductHeaderSection = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-accent-foreground inline-block text-xs">Showing all 0 results</span>
      {/* Sort Options */}
      <ProductSortOptions />
      {/* Filter Trigger Button For Mobile View */}
      <MobileFilterTrigger />
    </div>
  );
};

export default ProductHeaderSection;
