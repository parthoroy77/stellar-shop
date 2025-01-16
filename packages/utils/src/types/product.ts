import { IAttribute, IAttributeValue } from "./attribute";
import { TBrand } from "./brand";
import { ICategory } from "./category";
import { IProductDeliveryInfo, TProductShippingOption } from "./delivery-and-shipping";
import { IFile, IProductFile, IVariantFile } from "./file";
import { IInventoryLogs, IRestockInventoryRequest } from "./inventoryLogs";
import { IProductRatingAverage, IProductReview } from "./productReviewRatings";
import { TSeller } from "./seller";
import { ITag } from "./tag";

export const ProductActivationStatus = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  DRAFT: "DRAFT",
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
  createdAt: Date;
  updatedAt?: Date;
}

// Product Attributes
export interface IProductAttribute {
  id: number;
  productId: number; // Foreign key referencing Product
  attributeValueId: number; // Foreign key referencing AttributeValue
  createdAt: Date;
  updatedAt?: Date;
}
export interface IProductTag {
  id: number;
  productId: number;
  tagId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IProductCategory {
  id: number;
  productId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt?: Date;

  category: ICategory;
}

// Product Variants main interface
export interface IProductVariant {
  id: number;
  uniqueId: string;
  productId: number; // Foreign key referencing Product
  variantName: string;
  description?: string;
  price: number;
  stock: number;
  sku?: string;
  status: TVariantActivationStatus;
  createdAt: Date;
  updatedAt?: Date;
}

// Products
export interface IProduct {
  id: number;
  productName: string;
  uniqueId: string;
  sku: string;
  urlSlug: string;
  brandId: number; // Foreign key referencing Brand
  description: string;
  price: number;
  comparePrice: number;
  stock: number;
  status: TProductActivationStatus;
  sellerId: number; // Foreign key referencing User with Seller role
  createdAt: Date;
  updatedAt?: Date;
}

// extended product including all children elements
export type TProduct = IProduct & {
  // relations
  seller: TSeller;
  brand: TBrand;
  attributes: IProductAttribute &
    {
      attributeValue: IAttributeValue & {
        attribute: IAttribute;
      };
    }[];
  variants: TProductVariant[];
  images: IProductFile &
    {
      file: IFile;
    }[];
  tags: IProductTag &
    {
      tag: ITag;
    }[];
  categories: IProductCategory[];

  deliveryInfo: IProductDeliveryInfo;
  shippingOptions: TProductShippingOption[];
  inventoryLogs: IInventoryLogs[];
  restockInventoryRequests: IRestockInventoryRequest[];

  ratingAverage?: IProductRatingAverage;
  reviews?: IProductReview[];
};

export type TProductVariant = IProductVariant & {
  // relations
  images: IVariantFile & {
    file: IFile[];
  };
  attributes: IProductVariantAttribute &
    {
      attributeValue: IAttributeValue & {
        attribute: IAttribute;
      };
    }[];
  product: IProduct;
  inventoryLogs: IInventoryLogs[];
  restockInventoryRequests: IRestockInventoryRequest[];
};
