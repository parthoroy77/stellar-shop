// Delivery Method
export interface IShippingOption {
  id: number;
  name: string;
  charge: number;
  estimateDays: string;
  status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
  createdAt: Date;
  updatedAt?: Date;
}

// Product Delivery Method
export interface IProductShippingOption {
  id: number;
  productId: number; // Foreign key referencing Product
  shippingOptionId: number; // Foreign key referencing DeliveryMethod
  createdAt: Date;
  updatedAt?: Date;
}

export type TProductShippingOption = IProductShippingOption & {
  option: IShippingOption;
};

export interface IProductDeliveryInfo {
  id: number;
  productId: number;
  packageWeight: number;
  packageHeight: number;
  packageWidth: number;
  packageLength: number;

  createdAt: Date;
  updatedAt?: Date;
}
