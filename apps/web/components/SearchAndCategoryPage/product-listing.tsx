import ProductCard from "@/components/ui/product-card";
import MobileFilterTrigger from "./mobile-filter-trigger";
import ProductSortOptions from "./product-sort-options";

const ProductListing = () => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5">
      {Array.from({ length: 8 }).map((_x, index) => (
        <ProductCard key={index} />
      ))}
    </div>
  );
};

export default ProductListing;
