import { addToCart, clearUserCart, getMyCart } from "@/actions/cart";
import { useQueryClient, useQueryData } from "@repo/tanstack-query";
import { TCartItem } from "@repo/utils/types";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { toast } from "sonner";

type TUpdateCartPayload = {
  productId: number;
  quantity?: number;
  productVariantId?: number;
};

type TCartContext = {
  cartItems: TCartItem[];
  isInCart: (productId: number) => boolean;
  cartItemCount: number;
  clearCart: () => void;
  updateCart: (payload: TUpdateCartPayload) => void;
  invalidateCart: Promise<void>;
};

const CartContext = createContext<TCartContext | null>(null);

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  // Fetch cart items using tanstack-query
  const { data: cartItems = [] } = useQueryData<TCartItem[]>(["user-cart"], () => getMyCart(), {
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Prevent unnecessary refetch
  });

  const invalidateCart = queryClient.invalidateQueries({ queryKey: ["user-cart"] });

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
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
      toast.success(result.message);
    } else {
      // if fails set prev state
      queryClient.setQueryData(["user-cart"], prevState);
      toast.error(result.message);
    }
  };

  // add product to cart
  const updateCart = async ({ productId, productVariantId, quantity = 1 }: TUpdateCartPayload) => {
    // cancel ongoing query
    await queryClient.cancelQueries({ queryKey: ["user-cart"] });

    // create a snapshot of prev state
    const prevState = queryClient.getQueryData<TCartItem[]>(["user-cart"]) || [];

    const updatedState: TCartItem[] = [
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
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
      toast.success(result.message);
    } else {
      // if fails set prev state
      queryClient.setQueryData(["user-cart"], prevState);
      toast.error(result.message);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, isInCart, cartItemCount, clearCart, updateCart, invalidateCart }}>
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
