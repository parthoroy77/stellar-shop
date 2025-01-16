"use client";
import QuantitySelection from "@ui/components/ui/quantity-selection";
import { ClassValue, cn } from "@ui/lib/utils";
import { FC } from "react";

interface ProductQuantitySelectionProps {
  stock: number;
  initialQuantity: number;
  className?: ClassValue;
  productId: number;
}

const ProductQuantitySelection: FC<ProductQuantitySelectionProps> = ({ stock, initialQuantity, className }) => {
  return (
    <QuantitySelection
      className={cn("h-fit flex-row-reverse", className)}
      stock={stock}
      quantity={initialQuantity}
      incrementFn={() => {}}
      decrementFn={() => {}}
      disableDecBtn={initialQuantity === 1}
      disableIncBtn={stock === initialQuantity}
    />
  );
};

export default ProductQuantitySelection;
