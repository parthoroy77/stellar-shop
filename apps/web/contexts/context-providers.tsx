"use client";
import { ReactNode } from "react";
import CartContextProvider from "./cart-context";
import WishlistContextProvider from "./wishlist-context";

const ContextProviders = ({ children }: { children: ReactNode }) => {
  return (
    <CartContextProvider>
      <WishlistContextProvider>{children}</WishlistContextProvider>
    </CartContextProvider>
  );
};

export default ContextProviders;
