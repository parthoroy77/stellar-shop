// Product Tag
export interface ITag {
  id: number;
  name: string;
  productId: number; // Foreign key referencing Product
  createdAt: Date;
  updatedAt?: Date;
}
