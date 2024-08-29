import ProductReviewCard from "../ui/product-review-card";
// todo pagination
const ProductReviews = () => {
  return (
    <div className="flex flex-col divide-y">
      {Array.from({ length: 2 }).map((_x, i) => (
        <ProductReviewCard key={i} />
      ))}
    </div>
  );
};

export default ProductReviews;
