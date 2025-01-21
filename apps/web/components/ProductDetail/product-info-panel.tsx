"use client";
import { formatAttributes } from "@/utils/product-utils";
import { TProduct } from "@repo/utils/types";
import { FC } from "react";
import ProductActionButtons from "./product-action-buttons";
import ProductAttributeSelection from "./product-attribute-selection";
import ProductBrand from "./product-brand";
import ProductPrice from "./product-price";
import ProductQuantitySelection from "./product-quantity-selection";
import ProductRating from "./product-rating";
import ProductTags from "./product-tags";

interface ProductInfoProps {
  product: TProduct;
}

const ProductInfoPanel: FC<ProductInfoProps> = ({ product }) => {
  const { tags, price, comparePrice, attributes, stock, brand, id } = product || {};
  const simplifiedTags = tags?.map((tag) => ({ name: tag?.tag?.name, id: tag?.tag?.id })) || [];
  const avgDiscount = Math.round(((comparePrice - price) / comparePrice) * 100);
  // Simplified attributes into desired format
  const simplifiedAttributes = formatAttributes(attributes);

  return (
    <div className="divide-y *:py-2.5 lg:p-4">
      {/* name */}
      <h1 className="text-pretty !pt-0 text-2xl font-medium">{product.productName}</h1>
      <ProductRating averageRating={4.5} totalReview={0} productId={id} />
      {!!simplifiedTags.length && <ProductTags tags={simplifiedTags} discount={avgDiscount} lowStock={stock < 10} />}
      <ProductBrand brand={brand} />
      <ProductPrice comparePrice={comparePrice} price={price} />
      {!!simplifiedAttributes.length && <ProductAttributeSelection attributes={simplifiedAttributes} />}
      <div>
        <ProductQuantitySelection stock={stock} initialQuantity={0} productId={product.id} />
      </div>
      <ProductActionButtons />
    </div>
  );
};

export default ProductInfoPanel;
