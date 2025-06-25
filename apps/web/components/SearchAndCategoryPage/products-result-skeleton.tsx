import ProductListingSkeleton from "./product-listing-skeleton";
import SideFiltersSkeleton from "./side-filters-skeleton";

const ProductResultSkeleton = () => {
  return (
    <div className="flex gap-5">
      <SideFiltersSkeleton />
      <ProductListingSkeleton />
    </div>
  );
};

export default ProductResultSkeleton;
