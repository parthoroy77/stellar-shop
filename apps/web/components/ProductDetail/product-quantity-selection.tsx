"use client";
import QuantitySelection from "@ui/components/ui/quantity-selection";
import { ClassValue, cn } from "@ui/lib/utils";
import { Dispatch, FC, SetStateAction } from "react";

interface ProductQuantitySelectionProps {
  stock: number;
  quantity: number;
  className?: ClassValue;
  productId: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

const ProductQuantitySelection: FC<ProductQuantitySelectionProps> = ({ stock, quantity, className, setQuantity }) => {
  const handleQuantity = (type: "INC" | "DEC") => {
    setQuantity((prev) => (type === "INC" ? prev + 1 : prev - 1));
  };

  return (
    <QuantitySelection
      className={cn("h-fit flex-row-reverse", className)}
      stock={stock}
      quantity={quantity}
      incrementFn={() => handleQuantity("INC")}
      decrementFn={() => handleQuantity("DEC")}
      disableDecBtn={quantity === 0}
      disableIncBtn={stock === quantity}
    />
  );
};

export default ProductQuantitySelection;
