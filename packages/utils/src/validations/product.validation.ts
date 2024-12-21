import z from "zod";
import { imageFileSchema } from "./file.validation";

const productVariantValidation = z.object({
  variantName: z.string().min(1, "Variant name is required").max(70, "Variant name must be under 70 characters"),
  price: z.number().positive("Price must be greater than 0"),
  sku: z.string().regex(/^[a-zA-Z0-9-_]+$/, "SKU must be alphanumeric and can include dashes or underscores"),
  variantImages: z.array(imageFileSchema).max(1, "Max 1 images per variant"),
});

export const createProductValidationSchema = z.object({
  // Product Information
  productName: z.string().min(1, "Product name is required").max(100, "Product name must be under 100 characters"),
  productDescription: z.string().min(1, "Product description is required"),
  sku: z.string().regex(/^[a-zA-Z0-9-_]+$/, "SKU must be alphanumeric and can include dashes or underscores"),
  price: z.number().positive("Price must be greater than 0"),
  comparePrice: z.number(),
  // Product Media
  productImages: z.array(imageFileSchema).min(1, "At least one product image is required"),

  // Product Classifications
  category: z.object({
    collectionId: z.string(),
    categoryId: z.string(),
    subCategories: z.array(z.string()).optional(),
  }),
  brandId: z.string(),

  // Product Attributes
  attributes: z
    .array(
      z.object({
        attributeId: z.string(),
        attributeValueId: z.array(z.string()),
      })
    )
    .optional()
    .default([{ attributeId: "", attributeValueId: [] }]),
  variants: z.array(productVariantValidation).optional(),
});

export type TCreateProductValidation = z.infer<typeof createProductValidationSchema>;