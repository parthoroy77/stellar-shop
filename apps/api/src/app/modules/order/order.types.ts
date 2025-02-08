import { OrderPaymentStatus, OrderStatus } from "@repo/prisma/client";

export type TOrderFilters = {
  status: OrderStatus;
  paymentStatus: OrderPaymentStatus;
};
