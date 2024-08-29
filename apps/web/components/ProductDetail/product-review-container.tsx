import { TProduct } from "@repo/utils/types";
import { FC } from "react";
import ProductReviewStatistics from "./product-review-statistics";
import ProductReviews from "./product-reviews";

interface ProductReviewContainerProps {
  product: TProduct;
}

const ProductReviewContainer: FC<ProductReviewContainerProps> = ({ product }) => {
  const { productName, ratingAverage, reviews } = product || {};
  return (
    <div className="space-y-5 rounded-md border p-4">
      <ProductReviewHeading productName={productName} />
      <ProductReviewStatistics />
      <ProductReviews />
    </div>
  );
};

const ProductReviewHeading = ({ productName }: { productName: string }) => {
  return (
    <div>
      <h5 className="text-clip font-medium">Ratings & Reviews of {productName}</h5>
    </div>
  );
};

export default ProductReviewContainer;
