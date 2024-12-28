import z from "zod";

export const addToCartValidationSchema = z.object({
  productId: z.number(),
  variantId: z.number().optional(),
  quantity: z.number().positive(),
});

export const addToWishlistValidationSchema = z.object({
  productId: z.number(),
  variantId: z.number().optional(),
});
