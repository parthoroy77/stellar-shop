export interface IShippingOption {
  id: number;
  charge: number;
  name: string;
  estimateDays: string;
  status: "ACTIVE" | "INACTIVE" | "ARCHIVE";

  createdAt: Date;
  updatedAt?: Date;
}
