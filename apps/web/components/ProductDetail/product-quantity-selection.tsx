import { Button } from "@ui/index";
import { useCallback, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface ProductQuantitySelectionProps {
  stock: number;
  initialQuantity?: number;
}

const ProductQuantitySelection = ({ stock, initialQuantity = 0 }: ProductQuantitySelectionProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const incrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.min(prev + 1, stock));
  }, [stock]);

  const decrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <div>
      <div className="bg-accent/40 flex w-[60%] items-center justify-between rounded-md p-1 lg:w-[35%]">
        <Button
          disabled={quantity === stock}
          onClick={incrementQuantity}
          variant="outline"
          size={"sm"}
          className="text-primary h-fit w-fit p-2 text-sm lg:text-xl"
          aria-label="Increase Quantity"
        >
          <AiOutlinePlus />
        </Button>
        <span className="text-accent-foreground block text-base font-medium">{quantity || "Add"}</span>
        <Button
          disabled={quantity === 0}
          onClick={decrementQuantity}
          variant="outline"
          size={"sm"}
          className="text-primary h-fit w-fit p-2 text-sm lg:text-xl"
          aria-label="Decrease Quantity"
        >
          <AiOutlineMinus />
        </Button>
      </div>
    </div>
  );
};

export default ProductQuantitySelection;
