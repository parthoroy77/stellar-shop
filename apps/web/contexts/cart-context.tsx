import { createContext, ReactNode, useContext, useState } from "react";

type TCartItem = {};

type TCartContext = {};

const CartContext = createContext<TCartContext | null>(null);

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [] = useState<TCartItem[]>([]);

  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>;
};

export default CartContextProvider;

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart context must be used in CartContextProvider");
  return context;
};
