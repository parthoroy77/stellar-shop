import z from "zod";
import { imageFileSchema } from "./file.validation";

const attributeSchema = z.object({
  attributeId: z.string(),
  name: z.string().optional(),
  attributeValues: z.array(
    z.object({
      id: z.string(),
      name: z.string().optional(),
    })
  ),
});

const productVariantValidation = z.object({
  variantName: z.string().min(1, "Variant name is required").max(200, "Variant name must be under 200 characters"),
  price: z.number().positive("Price must be greater than 0"),
  sku: z.string().regex(/^[a-zA-Z0-9-_]+$/, "SKU must be alphanumeric and can include dashes or underscores"),
  variantImage: imageFileSchema,
  variantAttributes: z.array(attributeSchema),
  stock: z.number().positive("Stcok must be greater than 0"),
  isDefault: z.boolean().default(false),
});

export const createProductValidationSchema = z.object({
  // Product Information
  productName: z.string().min(1, "Product name is required").max(120, "Product name must be under 100 characters"),
  description: z.string().min(1, "Product description is required"),
  sku: z.string().regex(/^[a-zA-Z0-9-_]+$/, "SKU must be alphanumeric and can include dashes or underscores"),
  price: z.number().positive("Price must be greater than 0"),
  comparePrice: z.number().positive("Compare Price must be greater than 0"),
  stock: z.number().optional(),
  // Product Media
  productImages: z.array(imageFileSchema).min(1, "At least one product image is required"),

  // Product Classifications
  category: z.object({
    collectionId: z.string(),
    categoryId: z.string(),
    subCategories: z.array(z.string()),
  }),
  // brand Id
  brandId: z.string(),

  // Product Attributes
  attributes: z.array(attributeSchema).optional(),

  // Product Variants
  variants: z.array(productVariantValidation).optional(),

  // delivery information
  deliveryInformation: z.object({
    packageWeight: z.number(),
    packageHeight: z.number(),
    packageWidth: z.number(),
    packageLength: z.number(),
  }),
  shippingOptions: z.array(z.string()),

  // tags
  tags: z.array(z.string()).optional(),
});

export type TCreateProductValidation = z.infer<typeof createProductValidationSchema>;
