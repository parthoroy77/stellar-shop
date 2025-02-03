import { IShippingAddress, IShippingOption, TProduct } from "@repo/utils/types";

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
  logo: { fileSecureUrl: string };
  shopName: string;
  items: Array<Partial<TProduct> & { quantity: number }>;
  shippingOptions: Partial<IShippingOption>[];
  selectedShippingOption: number | null;
};
export type TCheckoutSession = {
  order: {
    totalAmount: number;
    discountAmount: number;
    grossAmount: number;
    shippingAmount: number;
    netAmount: number;
  };
  packages: TPackage[];
  shippingAddress: Partial<IShippingAddress> | null;
  paymentMethodId: number | null;
};
