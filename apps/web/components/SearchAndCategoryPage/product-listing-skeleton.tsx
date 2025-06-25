import ProductCardSkeleton from "../ui/product-card-skeleton";

const ProductListingSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3 md:gap-3 lg:w-[80%] lg:grid-cols-4 lg:gap-5">
      {Array.from({ length: 8 }).map((_x, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductListingSkeleton;
