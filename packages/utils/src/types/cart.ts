import { TProduct, TProductVariant } from "./product";

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
  productId?: number | null; // Nullable Foreign key referencing Product
  productVariantId?: number | null; // Nullable Foreign key referencing ProductVariant
  quantity: number;
  dateAdded: Date;
}

export type TCart = ICart & {
  cartItems: TCartItem[];
};

export type TCartItem = Partial<ICartItem> & {
  product?: Partial<TProduct>;
  productVariant?: Partial<TProductVariant>;
};
