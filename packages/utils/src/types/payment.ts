import { IOrder } from "./order";

export interface IPaymentProvider {
  id: number;
  name: string;
  active: boolean;
  metadata?: Record<string, any>; // JSON type maps to Record<string, any>

  // References (Related Models)
  paymentMethods: IPaymentMethod[];
}

// TypeScript types for PaymentMethod
export interface IPaymentMethod {
  id: number;
  name: string;
  providerId: number;
  description?: string;
  status: PaymentMethodStatus;
  type: PaymentMethodType;

  // timestamps
  createdAt: Date;
  updatedAt: Date;

  // References (Related Models)
  provider: IPaymentProvider;
  payments: IPayment[];
}

// Enum for PaymentMethodType
export enum PaymentMethodType {
  COD = "COD",
  CARD = "CARD",
  NET_BANKING = "NET_BANKING",
  WALLET = "WALLET",
}

// TypeScript types for Payment
export interface IPayment {
  id: number;
  uniqueId: string;
  orderId: number;
  paymentMethodId: number;
  gatewayTransactionId: string;
  amount: number; // Decimal type in Prisma maps to number in TypeScript
  status: PaymentStatus;

  // timestamps
  createdAt: Date;
  updatedAt: Date;

  // References (Related Models)
  order: IOrder;
  method: IPaymentMethod;
}

// Enum for PaymentStatus
export enum PaymentStatus {
  PROCESSING = "PROCESSING",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

// Enum for PaymentMethodStatus
export enum PaymentMethodStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
