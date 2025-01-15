"use client";
import { TAttribute, TProduct } from "@repo/utils/types";
import { FC } from "react";
import ProductActionButtons from "./product-action-buttons";
import ProductAttributeSelection from "./product-attribute-selection";
import ProductPrice from "./product-price";
import ProductQuantitySelection from "./product-quantity-selection";
import ProductRatingTags from "./product-rating-tag";

interface ProductInfoProps {
  product: TProduct;
}
// Function to format attributes
function formatAttributes(data: any[]): Partial<TAttribute>[] {
  const attributeMap = new Map<number, Partial<TAttribute>>();

  data.forEach((item) => {
    const {
      attributeValue: {
        id: valueId,
        value,
        attribute: { id: attributeId, name, ...restAttr },
        ...restAttrValue
      },
    } = item;

    if (!attributeMap.has(attributeId)) {
      attributeMap.set(attributeId, {
        id: attributeId,
        name,
        attributeValues: [],
        ...restAttr,
      });
    }

    attributeMap.get(attributeId)?.attributeValues?.push({
      id: valueId,
      value,
      attributeId,
      ...restAttrValue,
    });
  });

  return Array.from(attributeMap.values());
}

const ProductInfoPanel: FC<ProductInfoProps> = ({ product }) => {
  const { tags, ratingAverage, reviews, price, comparePrice, attributes, stock } = product || {};
  const simplifiedTags = tags?.map((tag) => ({ name: tag.tag.name, id: tag.tag.id })) || [];
  const avgDiscount = Math.round(((comparePrice - price) / comparePrice) * 100);
  // Simplified attributes into desired format
  const simplifiedAttributes = formatAttributes(attributes);
  return (
    <div className="divide-y *:py-3 lg:p-4">
      {/* name */}
      <h1 className="text-pretty text-2xl font-medium">{product.productName}</h1>
      <ProductRatingTags
        tags={simplifiedTags}
        averageRating={ratingAverage?.averageRating}
        totalReview={reviews?.length}
        discount={avgDiscount}
        lowStock={stock < 10}
      />
      <ProductPrice comparePrice={comparePrice} price={price} />
      <ProductAttributeSelection attributes={simplifiedAttributes} />
      <div>
        <ProductQuantitySelection className="" stock={stock} />
      </div>
      <ProductActionButtons />
    </div>
  );
};

export default ProductInfoPanel;
