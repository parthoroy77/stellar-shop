import { IShippingOption, TProduct, TProductVariant } from "@repo/utils/types";

export type TCheckoutInitiatePayload = {
  cartItemIds?: number[];
  checkoutProduct?: {
    productId: number;
    quantity: number;
    productVariantId?: number | null;
  };
};

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

export type TPackage = {
  sellerId: number;
  logo: { fileSecureUrl: string };
  shopName: string;
  items: Array<Partial<TProduct> & { quantity: number } & { variant: TProductVariant | null }>;
  shippingOptions: Partial<IShippingOption>[];
  selectedShippingOption: number | null;
};

export type TCheckoutSessionData = {
  packages: TPackage[];
  shippingAddress: number | null;
  paymentMethodId: number | null;
};
