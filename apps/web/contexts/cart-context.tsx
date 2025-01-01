import { getMyCart } from "@/actions/cart";
import { useQueryData } from "@repo/tanstack-query";
import { TCartItem } from "@repo/utils/types";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type TCartContext = {
  cartItems: TCartItem[];
  isInCart: (productId: number) => boolean;
  cartItemCount: number;
};

const CartContext = createContext<TCartContext | null>(null);

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);

  // check product in cart
  const isInCart = (productId: number) => {
    return cartItems.some((item) => item.product.id === productId);
  };

  const cartItemCount = useMemo(() => cartItems.length, [cartItems]) || 0;

  // Fetch cart items
  const { data, isFetching, isSuccess } = useQueryData(["user-cart"], () => getMyCart());
  // set cart data on state
  useEffect(() => {
    if (isSuccess) {
      setCartItems(data.length > 0 ? data : []);
    }
  }, [isFetching, isSuccess]);

  return <CartContext.Provider value={{ isInCart, cartItems, cartItemCount }}>{children}</CartContext.Provider>;
};

export default CartContextProvider;

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart context must be used in CartContextProvider");
  return context;
};
