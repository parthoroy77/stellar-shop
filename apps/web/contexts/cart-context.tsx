import { addToCart, clearUserCart, getMyCart, updateCartItemAction } from "@/actions/cart";
import { useClientSession } from "@/lib/auth-utils";
import { useQueryClient, useQueryData } from "@repo/tanstack-query";
import { TCartItem, TUpdateCartPayload } from "@repo/utils/types";
import { createContext, ReactNode, useContext, useEffect, useMemo } from "react";
import { toast } from "sonner";

type TAddCartPayload = {
  productId: number;
  quantity?: number;
  productVariantId?: number;
};

type TCartContext = {
  cartItems: TCartItem[];
  isInCart: (productId: number) => boolean;
  cartItemCount: number;
  clearCart: () => void;
  addProductToCart: (payload: TAddCartPayload) => void;
  updateCartItem: (payload: TUpdateCartPayload) => void;
  invalidateCart: () => Promise<void>;
};

const CartContext = createContext<TCartContext | null>(null);

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useClientSession();
  // Fetch cart items
  const { data: cartItems = [], refetch } = useQueryData<TCartItem[]>(["user-cart"], () => getMyCart(), {
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Prevent unnecessary refetch
    enabled: isAuthenticated,
  });

  const invalidateCart = async () => {
    await queryClient.invalidateQueries({ queryKey: ["user-cart"] });
  };

  // Check if a product is in the cart
  const isInCart = (productId: number) => cartItems.some((item) => item.productId === productId);

  // Calculate cart item count
  const cartItemCount = useMemo(() => cartItems.length, [cartItems]);

  // Optimistic clearCart function
  const clearCart = async () => {
    // if cart is empty!
    if (cartItemCount === 0) {
      toast.info("Your cart is empty!");
      return;
    }

    // cancel ongoing query
    await queryClient.cancelQueries({ queryKey: ["user-cart"] });

    // create a snapshot of prev state
    const prevState = queryClient.getQueryData<TCartItem[]>(["user-cart"]);

    // optimistically update the current state
    await queryClient.setQueryData(["user-cart"], []);

    // Do api call to clear cart
    const result = await clearUserCart();

    if (result.success) {
      // if success invalidate query
      await invalidateCart();
      toast.success(result.message);
    } else {
      // if fails set prev state
      queryClient.setQueryData(["user-cart"], prevState);
      toast.error(result.message);
    }
  };

  // Add product to cart
  const addProductToCart = async ({ productId, productVariantId, quantity = 1 }: TAddCartPayload) => {
    // cancel ongoing query
    await queryClient.cancelQueries({ queryKey: ["user-cart"] });

    // create a snapshot of prev state
    const prevState = queryClient.getQueryData<TCartItem[]>(["user-cart"]) || [];

    const updatedState: Partial<TCartItem>[] = [
      ...prevState,
      {
        quantity,
        productId,
        productVariantId: productVariantId ?? null,
      },
    ];

    // optimistically update the current state
    await queryClient.setQueryData(["user-cart"], updatedState);

    const result = await addToCart({ productId, productVariantId, quantity });

    if (result.success) {
      // if success invalidate query
      await invalidateCart();
      queryClient.invalidateQueries({ queryKey: ["car-summary"] });
      toast.success(result.message);
    } else {
      // if fails set prev state
      queryClient.setQueryData(["user-cart"], prevState);
      toast.error(result.message);
    }
  };

  // Update Cart Item
  const updateCartItem = async (payload: TUpdateCartPayload) => {
    const result = await updateCartItemAction(payload);

    if (result.success) {
      // if success invalidate query
      await invalidateCart();
      queryClient.invalidateQueries({ predicate: (queryKey) => queryKey.queryKey[0] === "cart-summary" });
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  // When user authenticated fetch cart
  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  return (
    <CartContext.Provider
      value={{ cartItems, isInCart, cartItemCount, clearCart, addProductToCart, invalidateCart, updateCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart context must be used within CartContextProvider");
  return context;
};
