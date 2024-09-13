import ProductCard from "@/components/ui/product-card";
import ProductSortOptions from "./product-sort-options";

const ProductListing = () => {
  return (
    <div className="w-full space-y-5 lg:w-[80%]">
      <ProductSortOptions productsCount={8} />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_x, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
