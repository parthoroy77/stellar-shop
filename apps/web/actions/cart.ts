"use server";
import { getServerAuth } from "@/lib/auth-utils";
import { fetcher } from "@/lib/fetcher";

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
