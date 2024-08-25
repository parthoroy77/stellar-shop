export const OrderStatus = {
  PLACED: "PLACED",
  PROCESSING: "PROCESSING",
  SHIPPING: "SHIPPING",
  DELIVERED: "DELIVERED",
} as const;

export type TOrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentStatus = {
  PAID: "PAID",
  NOT_PAID: "NOT_PAID",
} as const;

export type TPaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PaymentType = {
  CARD: "CARD",
  NET_BANKING: "NET_BANKING",
  MFS: "MFS",
  COD: "COD",
} as const;

export type TPaymentTypes = (typeof PaymentType)[keyof typeof PaymentType];

// Orders
export interface IOrder {
  id: number;
  orderNumber: string;
  userId: number; // Foreign key referencing User
  totalAmount: number;
  discountAmount: number;
  grossAmount: number;
  shippingAmount: number;
  netAmount: number;
  status: TOrderStatus;
  paymentStatus: TPaymentStatus;
  paymentType: TPaymentTypes;
  paymentTransactionId: string;
  orderNotes?: string;
  shipmentTrackingNumber?: string;
  createdAt: Date;
  updatedAt?: Date;
  orderPlacedAt: Date;
  orderShippedAt?: Date;
  orderDeliveredAt?: Date;
}

// Order Items
export interface IOrderItem {
  id: number;
  orderId: number; // Foreign key referencing Order
  productId: number; // Foreign key referencing Product
  productVariantId?: number; // Nullable Foreign key referencing ProductVariant
  productName: string;
  color?: string;
  size?: string;
  price: number;
  quantity: number;
  totalAmount: number;
  // Store all attributes statically
}

// Order Shipping Addresses
export interface IOrderShippingAddress {
  id: number;
  orderId: number; // Foreign key referencing Order
  shippingAddressId: number; // Foreign key referencing Address
  fullAddress: string;
  state: string;
  city: string;
  zipCode: string;
  country: string;
  createdAt: Date;
}
