// Seller Profiles
export interface ISellerProfile {
  id: number;
  userId: number; // Foreign key referencing User
  shopName: string;
  shopDescription?: string;
  shopLogo?: string; // URL
  shopBanner?: string; // URL
  createdAt: Date;
  updatedAt?: Date;
}
