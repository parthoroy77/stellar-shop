import { IShippingAddress, IShippingOption, TProduct } from "@repo/utils/types";

export type TCheckoutInitiatePayload = {
  cartItemIds?: (string | number)[];
  checkoutProduct: {
    productId: string | number;
    quantity: number | string;
    productVariantId?: string | number;
  };
};
export type TPackage = {
  sellerId: number;
  logo: { fileSecureUrl: string };
  shopName: string;
  items: TProduct[];
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
