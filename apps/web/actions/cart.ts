"use server";
import { getServerAuth } from "@/lib/auth-utils";
import { fetcher } from "@/lib/fetcher";
import { serverFetcher } from "@/lib/server-fetcher";
import { TCart } from "@repo/utils/types";

export const addToCart = async ({
  productId,
  quantity = 1,
  variantId,
}: {
  productId: number;
  quantity?: number;
  variantId?: number;
}) => {
  const { session } = await getServerAuth();
  const result = await fetcher<{}>("/carts/", {
    method: "POST",
    cache: "no-cache",
    session,
    body: { productId, variantId, quantity },
  });
  // TODO: later on invalidate carts data
  return result;
};

export const getMyCart = async () => {
  const { isAuthenticated } = await getServerAuth();
  if (!isAuthenticated) {
    return [];
  }
  const result = await serverFetcher<TCart>("/carts", {
    next: { tags: ["my-cart"], revalidate: 30 },
  });
  return result.data?.cartItems || [];
};
