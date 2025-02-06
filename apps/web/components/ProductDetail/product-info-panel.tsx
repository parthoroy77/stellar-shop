"use client";
import { useProductVariantSelector } from "@/hooks/use-product-variant-selector";
import { TProduct } from "@repo/utils/types";
import { FC, useCallback, useMemo, useState } from "react";
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

  const [quantity, setQuantity] = useState(1);

  // Centralized variant selection logic
  const { selectedVariant, availableAttrOptions, handleSelectAttribute, isValidCombination, isAttributeSelected } =
    useProductVariantSelector(variants);

  // Memoize the price and stock to avoid re-calculating on each render
  const price = useMemo(() => selectedVariant?.price ?? product.price, [selectedVariant, product.price]);
  const stock = useMemo(() => selectedVariant?.stock ?? product.stock, [selectedVariant, product.stock]);

  // Calculate average discount
  const avgDiscount = useMemo(
    () => (comparePrice ? Math.round(((comparePrice - product.price) / comparePrice) * 100) : 0),
    [comparePrice, product.price]
  );

  // Memoize outOfStock to avoid recalculating on every render
  const outOfStock = useMemo(() => quantity >= stock, [quantity, stock]);

  // Simplify tags for UI and memoize the result
  const simplifiedTags = useMemo(() => tags?.map((tag) => ({ name: tag?.tag?.name, id: tag?.tag?.id })) || [], [tags]);

  // Memoize quantity setter to avoid unnecessary re-renders when updating quantity
  const handleSetQuantity = useCallback((newQuantity: number) => setQuantity(newQuantity), []);

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
        <ProductQuantitySelection
          stock={stock}
          quantity={quantity}
          productId={product.id}
          setQuantity={handleSetQuantity}
        />
      </div>
      <ProductActionButtons
        outOfStock={outOfStock}
        productId={id}
        productVariantId={selectedVariant?.id ?? null}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductInfoPanel;
