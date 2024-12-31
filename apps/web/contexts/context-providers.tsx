"use client";
import { ReactNode } from "react";
import CartContextProvider from "./cart-context";

const ContextProviders = ({ children }: { children: ReactNode }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default ContextProviders;
