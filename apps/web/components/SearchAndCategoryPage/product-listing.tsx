import ProductCard from "@/components/ui/product-card";
import MobileFilterTrigger from "./mobile-filter-trigger";
import ProductSortOptions from "./product-sort-options";

const ProductListing = () => {
  return (
    <div className="w-full space-y-5 lg:w-[80%]">
      {/* Top Section */}
      <div className="flex w-full items-center justify-between">
        <span className="text-accent-foreground inline-block text-xs">Showing all 0 results</span>
        {/* Sort Options */}
        <ProductSortOptions productsCount={8} />
        {/* Filter Trigger Button For Mobile View */}
        <MobileFilterTrigger />
      </div>
      {/* Product Cards */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5">
        {Array.from({ length: 8 }).map((_x, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
