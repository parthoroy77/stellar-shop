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
  action: z.enum(["INC", "DEC"]),
});
