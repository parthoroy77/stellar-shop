// Cart
export interface ICart {
  id: number;
  userId: number; // Foreign key referencing User
  createdAt: Date;
  updatedAt?: Date;
}

// Cart Item
export interface ICartItem {
  id: number;
  userId: number; // Foreign key referencing User
  cartId: number; // Foreign key referencing Cart
  productId?: number; // Nullable Foreign key referencing Product
  productVariantId?: number; // Nullable Foreign key referencing ProductVariant
  quantity: number;
  dateAdded: Date;
}
