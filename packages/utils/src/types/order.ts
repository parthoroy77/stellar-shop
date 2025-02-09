import { TAddressTypes } from "./address";
import { IPayment, IPaymentMethod } from "./payment";
import { ISubOrder } from "./sub-order";
import { TUser } from "./user";

export const OrderStatus = {
  PLACED: "PLACED",
  CONFIRMED: "CONFIRMED",
  PROCESSING: "PROCESSING",
  PACKED: "PACKED",
  SHIPPED: "SHIPPED",
  IN_TRANSIT: "IN_TRANSIT",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  DELIVERY_FAILED: "DELIVERY_FAILED",
  CANCELED: "CANCELED",
  RETURN_INITIATED: "RETURN_INITIATED",
  RETURN_RECEIVED: "RETURN_RECEIVED",
  REPLACEMENT_INITIATED: "REPLACEMENT_INITIATED",
  REFUND_INITIATED: "REFUND_INITIATED",
  REFUND_COMPLETED: "REFUND_COMPLETED",
} as const;

export type TOrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export enum OrderPaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  UNPAID = "UNPAID",
}

// Orders
export interface IOrder {
  id: number;
  uniqueId: string;
  userId: number; // Foreign key referencing User
  totalAmount: number;
  discountAmount: number;
  grossAmount: number;
  shippingAmount: number;
  netAmount: number;
  orderNote?: string | null;
  status: TOrderStatus;
  paymentStatus: OrderPaymentStatus;
  paymentMethodId: number;
  paymentId: number | null;

  // Status timestamps
  orderPlacedAt: Date;
  orderPackedAt: Date;
  orderShippedAt: Date;
  orderDeliveredAt: Date;
  orderCanceledAt: Date;

  // Timestamps
  createdAt: Date;
  updatedAt?: Date;
}

// Order Items
export interface IOrderItem {
  id: number;
  orderId: number; // Foreign key referencing Order
  productId: number; // Foreign key referencing Product
  productVariantId?: number; // Nullable Foreign key referencing ProductVariant
  productName: string;
  attributes?: Record<string, any>;
  price: number;
  quantity: number;
  totalAmount: number;

  createdAt: Date;
  updatedAt?: Date;
}

// Order Shipping Addresses
export interface IOrderShippingAddress {
  id: number;

  orderId: number; // Foreign key referencing Order
  fullName: string;
  phone: string;
  fullAddress: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  type: TAddressTypes;

  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderStatusHistory {
  id: number;
  orderId: number;
  status: TOrderStatus;
  changedAt: number;
}

export type TOrder = IOrder & {
  user: TUser;
  orderItems: IOrderItem[];
  orderStatusHistory: IOrderStatusHistory[];
  subOrders: ISubOrder;
  orderShippingAddress: IOrderShippingAddress;
  paymentMethod: IPaymentMethod;
  payment: IPayment;
};
