export const InventoryLogType = {
  NEW_PRODUCT: "NEW_PRODUCT",
  RESTOCK: "RESTOCK",
  SALE: "SALE",
  REFUND: "REFUND",
} as const;

export type TInventoryLogType = (typeof InventoryLogType)[keyof typeof InventoryLogType];

export const InventoryLogAction = {
  ADDITION: "  ADDITION",
  DEDUCTION: "  DEDUCTION",
} as const;

export type TInventoryLogAction = (typeof InventoryLogAction)[keyof typeof InventoryLogAction];

export const RestockInventoryRequestStatus = {
  PENDING: "  PENDING",
  APPROVED: "  APPROVED",
  DENIED: "  DENIED",
} as const;

export type TRestockInventoryRequestStatus =
  (typeof RestockInventoryRequestStatus)[keyof typeof RestockInventoryRequestStatus];

export interface IInventoryLogs {
  id: number;
  productId: number;
  variantId?: number;
  type: TInventoryLogType;
  action: TInventoryLogAction;
  quantity: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IRestockInventoryRequest {
  id: number;
  productId: number;
  variantId: number;
  quantity: number;
  requestedBy: number;
  approvedBy: number;
  approvedAt: Date;
  status: TRestockInventoryRequestStatus;
  createdAt: Date;
  updatedAt?: Date;
}
