"use client";

import { serverFetcher } from "@/lib/server-fetcher";

export const getMyWishlist = async () => {
  const result = await serverFetcher("/wishlists");
  return result.data || [];
};
