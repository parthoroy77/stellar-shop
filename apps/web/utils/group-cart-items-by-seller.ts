import { TCartItem } from "@repo/utils/types";

export type TGroupedCartItem = Record<string, { seller: TCartItem["product"]["seller"]; items: TCartItem[] }>;

export const groupCartItemsBySeller = (item: TCartItem[]) => {
  const grouped = item.reduce((acc, item) => {
    const sellerId = item.product.seller.id;
    if (!acc[sellerId]) {
      acc[sellerId] = {
        seller: item.product.seller,
        items: [],
      };
    }
    acc[sellerId].items.push(item);
    return acc;
  }, {} as TGroupedCartItem);
  return grouped;
};
