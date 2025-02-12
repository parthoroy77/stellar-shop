import ProductCardSkeleton from "./product-card-skeleton";

const ProductShowcaseSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-1 lg:grid-cols-4 lg:gap-3">
      {Array.from({ length: 4 }).map((_x, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default ProductShowcaseSkeleton;
