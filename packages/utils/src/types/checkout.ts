import { IShippingOption } from "./delivery-and-shipping";
import { TProduct, TProductVariant } from "./product";

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
  items: Array<Partial<TProduct> & { quantity: number } & { variant: TProductVariant | null }>;
  shippingOptions: Partial<IShippingOption>[];
  selectedShippingOption: number | null;
};

export type TCheckoutSessionData = {
  packages: TPackage[];
  shippingAddress: number | null;
  paymentMethodId: number | null;
};
