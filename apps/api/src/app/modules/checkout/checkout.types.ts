import { IShippingAddress, TProduct } from "@repo/utils/types";

export type TCheckoutInitiatePayload = {
  cartItemIds?: (string | number)[];
  checkoutProduct: {
    productId: string | number;
    quantity: number | string;
    productVariantId?: string | number;
  };
};

export type TCheckoutSession = {
  order: {
    totalAmount: number;
    discountAmount: number;
    grossAmount: number;
    shippingAmount: number;
    netAmount: number;
  };
  packages: {
    sellerId: number;
    logo: { fileSecureUrl: string };
    shopName: string;
    items: TProduct[];
    shippingOptions: [];
    selectedShippingOption: number;
  }[];
  shippingAddress: Partial<IShippingAddress>;
  paymentMethodId: number;
};
