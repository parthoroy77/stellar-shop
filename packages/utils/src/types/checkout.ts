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
  // Drop the idea of package product delete
  // product?: { sellerId: number; productId: number };
  type: "shippingAddressUpdate" | "shippingOptionUpdate" | "paymentMethodUpdate" | "productDelete";
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

export type TCheckoutSummaryResponse = {
  totalAmount: number;
  totalShippingFee: number;
  netAmount: number;
  grossAmount: number;
  discountAmount: number;
  totalItem: 0;
};
