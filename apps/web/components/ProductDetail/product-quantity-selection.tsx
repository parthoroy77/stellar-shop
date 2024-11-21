"use client";
import { Button } from "@ui/index";
import { ClassValue, cn } from "@ui/lib/utils";
import { useCallback, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface ProductQuantitySelectionProps {
  stock: number;
  initialQuantity?: number;
  className?: ClassValue;
  buttonClass?: ClassValue;
  labelClass?: ClassValue;
}

const ProductQuantitySelection = ({
  stock,
  initialQuantity = 0,
  className,
  buttonClass,
  labelClass,
}: ProductQuantitySelectionProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const incrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.min(prev + 1, stock));
  }, [stock]);

  const decrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <div className={cn("bg-accent/40 flex w-[60%] items-center justify-between rounded-md p-1 lg:w-[35%]", className)}>
      <Button
        disabled={quantity === stock}
        onClick={incrementQuantity}
        variant="outline"
        size={"sm"}
        className={cn("text-primary h-fit w-fit p-2 text-sm lg:text-xl", buttonClass)}
        aria-label="Increase Quantity"
      >
        <AiOutlinePlus />
      </Button>
      <span className={cn("text-accent-foreground block text-base font-medium", labelClass)}>{quantity || "Add"}</span>
      <Button
        disabled={quantity === 0}
        onClick={decrementQuantity}
        variant="outline"
        size={"sm"}
        className={cn("text-primary h-fit w-fit p-2 text-sm lg:text-xl", buttonClass)}
        aria-label="Decrease Quantity"
      >
        <AiOutlineMinus />
      </Button>
    </div>
  );
};

export default ProductQuantitySelection;
