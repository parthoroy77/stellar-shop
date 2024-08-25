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
  userId: number; // Foreign key referencing User
  productId: number; // Foreign key referencing Product
  productVariantId?: number; // Nullable Foreign key referencing ProductVariant
  dateAdded: Date;
}
