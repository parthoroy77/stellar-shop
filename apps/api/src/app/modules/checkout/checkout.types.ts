export type TCheckoutInitiatePayload = {
  cartItemIds?: number[];
  checkoutProduct?: {
    productId: number;
    quantity: number;
    productVariantId?: number | null;
  };
};

export type TPackage = {
  sellerId: number;
  items: Array<{ productId: number; productVariantId?: number | null; quantity: number }>;
  shippingOptions: number[];
  selectedShippingOption: number | null;
};

export type TCheckoutSession = {
  packages: TPackage[];
  shippingAddress: number | null;
  paymentMethodId: number | null;
};
