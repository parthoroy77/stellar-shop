"use server";
import { getServerAuth } from "@/lib/auth-utils";
import { serverFetcher } from "@/lib/server-fetcher";
import { TCart, TUpdateCartPayload } from "@repo/utils/types";
import { revalidateTag } from "next/cache";

export const addToCart = async ({
  productId,
  quantity = 1,
  productVariantId,
}: {
  productId: number;
  quantity?: number;
  productVariantId?: number;
}) => {
  const result = await serverFetcher<{}>("/carts/", {
    method: "POST",
    cache: "no-cache",
    body: { productId, productVariantId, quantity },
  });
  if (result.success) {
    revalidateTag("my-cart");
  }
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

export const clearUserCart = async () => {
  const result = await serverFetcher("/carts", { method: "DELETE" });

  if (result.success) {
    revalidateTag("my-cart");
  }

  return result;
};

export const deleteCartItem = async (cartItemId: number) => {
  const result = await serverFetcher(`/carts/${cartItemId}`, { method: "DELETE" });
  if (result.success) {
    revalidateTag("my-cart");
  }
  return result;
};

export const updateCartItemAction = async (payload: TUpdateCartPayload) => {
  const result = await serverFetcher(`/carts/`, { method: "PATCH", body: payload });
  if (result.success) {
    revalidateTag("my-cart");
  }
  return result;
};
