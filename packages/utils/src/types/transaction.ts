export const TransactionStatus = {
  PENDING: "PENDING",
  FAILED: "FAILED",
  COMPLETED: "COMPLETED",
} as const;

export type TTransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];

// Transactions
export interface ITransaction {
  id: number;
  orderId: number; // Foreign key referencing Order
  paymentId: number; // Foreign key referencing Payment
  transactionId: string;
  amount: number;
  transactionDate: Date;
  status: TTransactionStatus;
  createdAt: Date;
  updatedAt?: Date;
}
