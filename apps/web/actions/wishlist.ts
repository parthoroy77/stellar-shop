"use server";
import { getServerAuth } from "@/lib/auth-utils";
import { serverFetcher } from "@/lib/server-fetcher";
import { TToggleWishlistPayload, TWishlist } from "@repo/utils/types";
import { revalidateTag } from "next/cache";

export const getMyWishlist = async () => {
  const { isAuthenticated } = await getServerAuth();
  if (!isAuthenticated) {
    return [];
  }
  const result = await serverFetcher<TWishlist>("/wishlists", { next: { tags: ["my-wishlist"], revalidate: 300 } });
  return result.data?.wishlistItems || [];
};

export const toggleUserWishlist = async (payload: TToggleWishlistPayload) => {
  const result = await serverFetcher("/wishlists/toggle", { body: payload, cache: "no-cache", method: "POST" });
  if (result.success) {
    revalidateTag("my-wishlist");
  }
  return result;
};
