import { TProduct } from "@repo/utils/types";
import { FC } from "react";
import ProductReviewStatistics from "./product-review-statistics";
import ProductReviews from "./product-reviews";

interface ProductReviewContainerProps {
  product: TProduct;
}

const ProductReviewContainer: FC<ProductReviewContainerProps> = ({ product }) => {
  const { productName } = product || {};
  return (
    <div className="space-y-5 divide-y rounded-md border p-4">
      <ProductReviewHeading productName={productName} />
      <ProductReviewStatistics />
      <ProductReviews />
    </div>
  );
};

const ProductReviewHeading = ({ productName }: { productName: string }) => {
  return (
    <div>
      <h5 className="text-clip text-sm font-medium lg:text-base">Ratings & Reviews of {productName}</h5>
    </div>
  );
};

export default ProductReviewContainer;
