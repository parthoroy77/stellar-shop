import { IShippingAddress } from "./address";
import { IShippingOption } from "./delivery-and-shipping";
import { IPaymentMethod } from "./payment";
import { TProduct, TProductVariant } from "./product";

export type TCheckoutInitiatePayload = {
  cartItemIds?: number[];
  checkoutProduct?: {
    productId: number;
    quantity: number;
    productVariantId?: number | null;
  };
};

export type TCheckoutUpdatePayload = {
  type: "shippingAddressUpdate" | "shippingOptionUpdate" | "paymentMethodUpdate";
  shippingAddressId?: number;
  shippingOption?: { sellerId: number; shippingOptionId: number };
  paymentMethodId?: number;
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
  shippingAddress: Partial<IShippingAddress> | null;
  paymentMethod: Pick<IPaymentMethod, "id" | "methodName"> | null;
};
