"use client";
import { TProduct } from "@repo/utils/types";
import { FC, useState } from "react";
import ProductActionButtons from "./product-action-buttons";
import ProductAttributeSelection from "./product-attribute-selection";
import ProductPrice from "./product-price";
import ProductQuantitySelection from "./product-quantity-selection";
import ProductRatingTags from "./product-rating-tag";

interface ProductInfoProps {
  product: TProduct;
}

const ProductInfoPanel: FC<ProductInfoProps> = ({ product }) => {
  const { tags, ratingAverage, reviews, price, comparePrice, attributes, stockQuantity } = product || {};
  const [productPrice] = useState<number>(price);
  return (
    <div className="divide-y *:py-3 lg:p-4">
      {/* name */}
      <h1 className="text-pretty text-2xl font-medium">{product.productName}</h1>
      <ProductRatingTags
        tags={tags && tags}
        averageRating={ratingAverage?.averageRating}
        totalReview={reviews?.length}
      />
      <ProductPrice comparePrice={comparePrice} price={productPrice} />
      <ProductAttributeSelection attributes={attributes} />
      <ProductQuantitySelection stock={stockQuantity} />
      <ProductActionButtons />
    </div>
  );
};

export default ProductInfoPanel;
