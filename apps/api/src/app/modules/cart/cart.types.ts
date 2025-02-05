export type TAddToCartInput = {
  productId: number;
  productVariantId?: number | null;
  quantity: number;
  userId: number;
};
