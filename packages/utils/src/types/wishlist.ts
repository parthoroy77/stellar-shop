import { TProduct, TProductVariant } from "./product";

// Wishlist
export interface IWishlist {
  id: number;
  userId: number; // Foreign key referencing User
  createdAt: Date;
  updatedAt?: Date;
}

// Wishlist Item
export interface IWishlistItem {
  id: number;
  userId: number;
  wishlistId: number;
  productId: number;
  productVariantId?: number | null;

  createdAt: Date;
  updatedAt?: Date;
}

export type TWishlist = IWishlist & {
  wishlistItems: TWishlistItem[];
};

export type TWishlistItem = Pick<IWishlistItem, "id" | "productId" | "productVariantId"> & {
  product: Pick<TProduct, "id" | "urlSlug" | "price" | "stock" | "productName" | "images">;
  productVariant?: Pick<TProductVariant, "id" | "price" | "stock" | "variantName" | "attributes">;
};

export type TToggleWishlistPayload = {
  productId: number;
  productVariantId?: number;
};
