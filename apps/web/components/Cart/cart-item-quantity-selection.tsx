"use client";
import { useCartContext } from "@/contexts/cart-context";
import QuantitySelection from "@ui/components/ui/quantity-selection";

const CartItemQuantitySelection = ({
  stock,
  initialQuantity,
  cartItemId,
}: {
  stock: number;
  initialQuantity: number;
  cartItemId: number;
}) => {
  const { updateCartItem } = useCartContext();
  const handleIncrement = () => {
    updateCartItem({ cartItemId, action: "INC" });
  };
  const handleDecrement = () => {
    updateCartItem({ cartItemId, action: "DEC" });
  };
  return (
    <QuantitySelection
      className="h-fit w-[120px] flex-row-reverse lg:min-w-[150px]"
      buttonClass="text-xs lg:p-2 p-1 lg:text-sm"
      labelClass="text-xs"
      stock={stock}
      quantity={initialQuantity}
      incrementFn={handleIncrement}
      decrementFn={handleDecrement}
      disableDecBtn={initialQuantity === 1}
      disableIncBtn={stock === initialQuantity}
    />
  );
};

export default CartItemQuantitySelection;
