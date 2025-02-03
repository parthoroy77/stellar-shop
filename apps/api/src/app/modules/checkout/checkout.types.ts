export type TPackageItem = {
  sellerId: number;
  items: Array<{ productId: number; productVariantId?: number | null; quantity: number }>;
  shippingOptions: number[];
  selectedShippingOption: number | null;
};

export type TCheckoutSession = {
  packages: TPackageItem[];
  shippingAddress: number | null;
  paymentMethodId: number | null;
};
