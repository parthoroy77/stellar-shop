import ProductCard from "@/components/ui/product-card";
import ProductSortOptions from "./product-sort-options";
import ProductCardSkeleton from "../ui/product-card-skeleton";

const ProductListing = () => {
  return (
    <div className="w-[80%] space-y-5">
      <ProductSortOptions productsCount={8} />
      <div className="grid grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_x, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
