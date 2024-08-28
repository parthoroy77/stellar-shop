import { IAttribute, IAttributeValue, TAttribute } from "./attribute";
import { IBrand } from "./brand";
import { TCategory } from "./category";
import { IFile } from "./file";
import { IProductRatingAverage, IProductReview } from "./productReviewRatings";
import { ISellerProfile } from "./seller";
import { ITag } from "./tag";

export const ProductActivationStatus = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type TProductActivationStatus = (typeof ProductActivationStatus)[keyof typeof ProductActivationStatus];

export const VariantActivationStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type TVariantActivationStatus = (typeof VariantActivationStatus)[keyof typeof VariantActivationStatus];

// Product Variant Attributes
export interface IProductVariantAttribute {
  id: number;
  variantId: number; // Foreign key referencing ProductVariant
  attributeValueId: number; // Foreign key referencing AttributeValue
  attributeId: number; // Foreign key referencing Attribute
  createdAt: Date;
  updatedAt?: Date;
}

// Product Attributes
export interface IProductAttribute {
  id: number;
  productId: number; // Foreign key referencing Product
  attributeValueId: number; // Foreign key referencing AttributeValue
  attributeId: number; // Foreign key referencing Attribute
  createdAt: Date;
  updatedAt?: Date;
}

// Product Variants main interface
export interface IProductVariant {
  id: number;
  productId: number; // Foreign key referencing Product
  variantName: string;
  description?: string;
  price: number;
  stockQuantity: number;
  sku?: string;
  status: TVariantActivationStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export type TProductVariant = IProductVariant & {
  // relations
  images: IFile[];
  attributes: IAttribute &
    {
      value: IAttributeValue;
    }[];
};

// Products
export interface IProduct {
  id: number;
  productName: string;
  urlSlug: string;
  categoryId: number; // Foreign key referencing Category
  brandId: number; // Foreign key referencing Brand
  description: string;
  price: number;
  comparePrice: number;
  stockQuantity: number;
  lowStockThreshold: number;
  status: TProductActivationStatus;
  sellerId: number; // Foreign key referencing User with Seller role
  createdAt: Date;
  updatedAt?: Date;
}

export type TProduct = IProduct & {
  // relations
  images: IFile[];
  brand?: IBrand;
  tags?: ITag[];
  categories: TCategory[];
  attributes: TAttribute[];
  variants: TProductVariant[];
  ratingAverage?: IProductRatingAverage;
  reviews?: IProductReview[];
  seller: ISellerProfile;
};
