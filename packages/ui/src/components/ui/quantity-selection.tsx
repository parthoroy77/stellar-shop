"use client";
import { Button } from "@ui/index";
import { ClassValue, cn } from "@ui/lib/utils";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface QuantitySelectionProps {
  stock: number;
  className?: ClassValue;
  buttonClass?: ClassValue;
  labelClass?: ClassValue;
  quantity: number;
  incrementFn: () => void;
  decrementFn: () => void;
  disableIncBtn: boolean;
  disableDecBtn: boolean;
}

const QuantitySelection = ({
  quantity = 0,
  className,
  buttonClass,
  labelClass,
  incrementFn,
  decrementFn,
  disableIncBtn,
  disableDecBtn,
}: QuantitySelectionProps) => {
  return (
    <div className={cn("bg-accent/40 flex w-[60%] items-center justify-between rounded-md p-1 lg:w-[45%]", className)}>
      <Button
        disabled={disableIncBtn}
        onClick={incrementFn}
        variant="outline"
        size={"sm"}
        className={cn("text-primary h-fit w-fit p-2 text-sm lg:text-xl", buttonClass)}
        aria-label="Increase Quantity"
      >
        <AiOutlinePlus />
      </Button>
      <span className={cn("text-accent-foreground block text-base font-medium", labelClass)}>{quantity || "Add"}</span>
      <Button
        disabled={disableDecBtn}
        onClick={decrementFn}
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

export default QuantitySelection;
