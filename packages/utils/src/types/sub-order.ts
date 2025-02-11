import { IShippingOption } from "./delivery-and-shipping";
import { TOrder } from "./order";
import { TProduct, TProductVariant } from "./product";
import { TSeller } from "./seller";

export enum SubOrderStatus {
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  PACKED = "PACKED",
  SHIPPED = "SHIPPED",
  IN_TRANSIT = "IN_TRANSIT",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  DELIVERY_FAILED = "DELIVERY_FAILED",
  RETURN_INITIATED = "RETURN_INITIATED",
  RETURN_RECEIVED = "RETURN_RECEIVED",
  REPLACEMENT_INITIATED = "REPLACEMENT_INITIATED",
  REFUND_INITIATED = "REFUND_INITIATED",
  REFUND_COMPLETED = "REFUND_COMPLETED",
  CANCELED = "CANCELED",
}

export interface ISubOrder {
  id: number;
  uniqueId: string;
  orderId: number;
  sellerId: number;
  totalAmount: number; // Decimal type in Prisma maps to number in TypeScript
  discountAmount: number; // Decimal type in Prisma maps to number in TypeScript
  netAmount: number; // Decimal type in Prisma maps to number in TypeScript
  orderNote?: string;
  status: SubOrderStatus;
  shippingOptionId: number;

  // timestamps
  createdAt: Date;
  updatedAt: Date;

  // Status timestamps
  orderPlacedAt: Date;
  orderPackedAt?: Date;
  orderShippedAt?: Date;
  orderDeliveredAt?: Date;
  orderCanceledAt?: Date;

  // References (Related Models)
  seller: TSeller;
  order: TOrder;
  subOrderItems: ISubOrderItem[];
  shippingOption: IShippingOption;
}

export interface ISubOrderItem {
  id: number;
  subOrderId: number;
  productId: number;
  productVariantId?: number;
  productName: string;
  attributes: Record<string, any>; // JSON type maps to Record<string, any>
  price: number; // Decimal type in Prisma maps to number in TypeScript
  quantity: number;
  totalAmount: number; // Decimal type in Prisma maps to number in TypeScript

  // timestamps
  createdAt: Date;
  updatedAt: Date;

  // Reference (Related Model)
  subOrder: ISubOrder;
  product: Pick<TProduct, "uniqueId" | "images">;
  productVariant: Pick<TProductVariant, "uniqueId" | "images">;
}
