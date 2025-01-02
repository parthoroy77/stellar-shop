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

export const updateCartItemValidationSchema = z.object({
  cartItemId: z.number(),
  productId: z.number(),
  quantity: z.number().positive(),
  action: z.enum(["INC", "DEC"]),
});
