export const PaymentCompletionStatus = {
  PLACED: "PLACED",
  PROCESSING: "PROCESSING",
  SHIPPING: "SHIPPING",
  DELIVERED: "DELIVERED",
} as const;

export type TPaymentCompletionStatus = (typeof PaymentCompletionStatus)[keyof typeof PaymentCompletionStatus];

export const PaymentMethodActivationStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type TPaymentMethodActivationStatus =
  (typeof PaymentMethodActivationStatus)[keyof typeof PaymentMethodActivationStatus];

// Payment Provider
export interface IPaymentProvider {
  id: string;
  name: string;
  active: boolean;
  metadata: Record<string, any> | null;
}

// Payment Method
export interface IPaymentMethod {
  id: number;
  providerId: number;
  name: string;
  description?: string;
  status: TPaymentMethodActivationStatus;
  createdAt: Date;
  updatedAt?: Date;
}

// Payment
export interface IPayment {
  id: number;
  uniqueId: string;
  orderId: number; // Foreign key referencing Order
  paymentMethodId: number; // Foreign key referencing PaymentMethod
  gatewayTransactionId: string;
  amount: number;
  status: TPaymentCompletionStatus;
  createdAt: Date;
  updatedAt?: Date;
}
