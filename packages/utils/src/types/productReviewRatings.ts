import { IFile } from "./file";
import { TProduct } from "./product";
import { TUser } from "./user";

// Product Review
export interface IProductReview {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  description: string | null;

  // timestamps
  createdAt: Date;
  updatedAt?: Date;

  images: IProductReviewFile[];
  user: TUser;
  product: TProduct;
}

export interface IProductReviewFile {
  id: number;
  fileId: number;
  productReviewId: number;

  file: IFile;
  productReview: IProductReview;
}

// product review creation payload
export type TProductReviewPayload = {
  productId: number;
  rating: number;
  description: string;
  orderId: string;
};

// Product Rating Averages (Not added right now)
export interface IProductRatingAverage {
  id: number;
  productId: number; // Foreign key referencing Product
  averageRating: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt?: Date;
}
