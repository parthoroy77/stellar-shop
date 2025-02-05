"use client";
import { useProductVariantSelector } from "@/hooks/use-product-variant-selector";
import { TProduct } from "@repo/utils/types";
import { FC } from "react";
import ProductActionButtons from "./product-action-buttons";
import ProductBrand from "./product-brand";
import ProductPrice from "./product-price";
import ProductQuantitySelection from "./product-quantity-selection";
import ProductRating from "./product-rating";
import ProductTags from "./product-tags";
import ProductVariantSelection from "./product-variant-selection";

interface ProductInfoProps {
  product: TProduct;
}

const ProductInfoPanel: FC<ProductInfoProps> = ({ product }) => {
  const { tags, variants, comparePrice, brand, id } = product || {};

  // Centralized variant selection logic
  const { selectedVariant, availableAttrOptions, handleSelectAttribute, isValidCombination, isAttributeSelected } =
    useProductVariantSelector(variants);

  // Get the correct price & stock from the selected variant
  const price = selectedVariant?.price ?? product.price;
  const stock = selectedVariant?.stock ?? product.stock;
  const avgDiscount = comparePrice ? Math.round(((comparePrice - product.price) / comparePrice) * 100) : 0;

  // Simplify tags for UI
  const simplifiedTags = tags?.map((tag) => ({ name: tag?.tag?.name, id: tag?.tag?.id })) || [];

  return (
    <div className="divide-y *:py-2.5 lg:p-4">
      {/* Name */}
      <h1 className="text-pretty !pt-0 text-2xl font-medium">{product.productName}</h1>
      <ProductRating averageRating={4.5} totalReview={0} productId={id} />
      {!!simplifiedTags.length && <ProductTags tags={simplifiedTags} discount={avgDiscount} lowStock={stock < 10} />}
      <ProductBrand brand={brand} />
      <ProductPrice comparePrice={comparePrice} price={price} />

      {!!variants.length && (
        <ProductVariantSelection
          availableAttrOptions={availableAttrOptions}
          handleSelectAttribute={handleSelectAttribute}
          isValidCombination={isValidCombination}
          isAttributeSelected={isAttributeSelected}
        />
      )}
      <div>
        <ProductQuantitySelection stock={stock} initialQuantity={1} productId={product.id} />
      </div>
      <ProductActionButtons />
    </div>
  );
};

export default ProductInfoPanel;
