export const ShipmentStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  IN_TRANSIT: "IN_TRANSIT",
  DELIVERED: "DELIVERED",
  RETURNED: "RETURNED",
} as const;

export type TShipmentStatus = (typeof ShipmentStatus)[keyof typeof ShipmentStatus];

// Shipments
export interface IShipment {
  id: number;
  orderId: number; // Foreign key referencing Order
  trackingNumber: string;
  carrier: string;
  shippingDate: Date;
  estimatedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  status: TShipmentStatus;
  createdAt: Date;
  updatedAt?: Date;
}
