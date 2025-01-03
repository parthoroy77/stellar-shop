"use client";

import { getMyWishlist, toggleUserWishlist } from "@/actions/wishlist";
import { useQueryClient, useQueryData } from "@repo/tanstack-query";
import { TToggleWishlistPayload, TWishlistItem } from "@repo/utils/types";
import { createContext, ReactNode, useContext } from "react";
import { toast } from "sonner";

type TWishlistContext = {
  wishlistItems: TWishlistItem[];
  isInWishlist: (productId: number) => boolean;
  invalidateWishlist: () => Promise<void>;
  toggleWishlist: (payload: TToggleWishlistPayload) => Promise<void>;
};

const WishlistContext = createContext<TWishlistContext | null>(null);

const WishlistContextProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  // Fetch wishlist items
  const { data: wishlistItems = [] } = useQueryData(["my-wishlist"], getMyWishlist, {
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Prevent unnecessary refetch
  });

  // Invalidate wishlist
  const invalidateWishlist = async () => {
    await queryClient.invalidateQueries({ queryKey: ["my-wishlist"] });
  };

  // Check if a product is in the wishlist
  const isInWishlist = (productId: number, productVariantId?: number): boolean => {
    return wishlistItems.some(
      (item) => item.productId === productId && (productVariantId ? item.productVariantId === productVariantId : true)
    );
  };

  // Toggle wishlist item
  const toggleWishlist = async ({ productId, productVariantId }: TToggleWishlistPayload) => {
    await queryClient.cancelQueries({ queryKey: ["my-wishlist"] });

    const prevState = queryClient.getQueryData<TWishlistItem[]>(["my-wishlist"]) || [];

    // Optimistically update state (If product already in wishlist remove or add)
    const updatedData = isInWishlist(productId, productVariantId)
      ? prevState.filter((item) => item.productId !== productId || item.productVariantId !== productVariantId)
      : [...prevState, { productId, productVariantId: productVariantId || null }];

    queryClient.setQueryData(["my-wishlist"], updatedData);

    try {
      const result = await toggleUserWishlist({ productId, productVariantId });

      if (result.success) {
        await queryClient.invalidateQueries({ queryKey: ["my-wishlist"] });
        toast.success(result.message);
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      queryClient.setQueryData(["my-wishlist"], prevState);
      toast.error(error.message || "An error occurred while updating the wishlist.");
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, isInWishlist, invalidateWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("WishlistContext must be used within WishlistContextProvider");
  return context;
};

export default WishlistContextProvider;
