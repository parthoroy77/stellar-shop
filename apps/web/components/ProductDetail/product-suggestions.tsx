import DemoProductCard from "../ui/demo-product-card";

const ProductSuggestion = () => {
  return (
    <div className="space-y-3">
      <h5 className="font-medium">Suggested Product</h5>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_x, i) => (
          <DemoProductCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default ProductSuggestion;
