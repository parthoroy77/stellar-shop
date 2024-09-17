import ProductCard from "../ui/product-card";

const ProductShowcase = () => {
  return (
    <div className="grid grid-cols-2 gap-1 lg:grid-cols-4 lg:gap-3">
      {Array.from({ length: 4 }).map((_x, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  );
};

export default ProductShowcase;
