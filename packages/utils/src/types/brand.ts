// Brand
export interface IBrand {
  id: number;
  name: string;
  description?: string;
  logo?: string; // URL to the brand logo
  createdAt: Date;
  updatedAt?: Date;
}
