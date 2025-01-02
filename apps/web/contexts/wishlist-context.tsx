"use client";
import { createContext, ReactNode, useContext } from "react";

type TWishlistContext = {};

const WishlistContext = createContext<TWishlistContext | null>(null);

const WishlistContextProvider = ({ children }: { children: ReactNode }) => {
  return <WishlistContext.Provider value={{}}>{children}</WishlistContext.Provider>;
};

export default WishlistContextProvider;

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("Wishlist context must be used within WishlistContextProvider");
  return context;
};
