import { TCartItem } from "@repo/utils/types";

export type TGroupItem = { seller: TCartItem["product"]["seller"]; items: TCartItem[] };

export type TGroupedCartItem = Record<string, TGroupItem>;

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
