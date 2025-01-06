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

export type TCartItem = Pick<ICartItem, "id" | "quantity" | "productId" | "productVariantId"> & {
  product: Pick<TProduct, "id" | "uniqueId" | "urlSlug" | "price" | "stock" | "productName" | "images" | "seller">;
  productVariant?: Pick<TProductVariant, "id" | "uniqueId" | "price" | "stock" | "variantName" | "attributes">;
};

export type TCartActionType = "INC" | "DEC";

export type TUpdateCartPayload = {
  cartItemId: number;
  action: TCartActionType;
};

export type TCartSummary = {
  subTotal: number;
  totalItem: number;
  shippingFee: number;
  total: number;
};
