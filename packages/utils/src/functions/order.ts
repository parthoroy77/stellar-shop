import { OrderStatus } from "../types";

type OrderMetrics = {
  pending: number;
  processing: number;
  inTransit: number;
  completed: number;
  canceled: number;
  failed: number;
};

export function countOrderStatuses(statuses: (keyof typeof OrderStatus)[]): OrderMetrics {
  const metrics: OrderMetrics = {
    pending: 0,
    processing: 0,
    inTransit: 0,
    completed: 0,
    canceled: 0,
    failed: 0,
  };

  for (const status of statuses) {
    if (status === OrderStatus.PLACED || status === OrderStatus.PROCESSING) {
      metrics.pending += 1;
    } else if (status === OrderStatus.CONFIRMED || status === OrderStatus.PACKED) {
      metrics.processing += 1;
    } else if (
      status === OrderStatus.SHIPPED ||
      status === OrderStatus.IN_TRANSIT ||
      status === OrderStatus.OUT_FOR_DELIVERY
    ) {
      metrics.inTransit += 1;
    } else if (status === OrderStatus.DELIVERED) {
      metrics.completed += 1;
    } else if (status === OrderStatus.CANCELED) {
      metrics.canceled += 1;
    } else if (status === OrderStatus.DELIVERY_FAILED) {
      metrics.failed += 1;
    }
  }

  return metrics;
}
