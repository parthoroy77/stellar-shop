// Product Review
export interface IProductReview {
  id: number;
  productId: number; // Foreign key referencing Product
  userId: number; // Foreign key referencing User
  rating: number; // Rating score (e.g., 1 to 5)
  reviewText?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Product Rating Averages
export interface IProductRatingAverage {
  id: number;
  productId: number; // Foreign key referencing Product
  averageRating: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt?: Date;
}
