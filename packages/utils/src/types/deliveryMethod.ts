// Delivery Method
export interface IDeliveryMethod {
  id: number;
  methodName: string;
  cost: number;
  estimateDeliveryTime: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Product Delivery Method
export interface IProductDeliveryMethod {
  id: number;
  productId: number; // Foreign key referencing Product
  deliveryMethodId: number; // Foreign key referencing DeliveryMethod
  createdAt: Date;
  updatedAt?: Date;
}
