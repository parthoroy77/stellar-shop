import z from "zod";

export const addProductReviewSchema = z.object({
  productId: z.number(),
  rating: z.number().gt(0).lte(5),
  description: z.string().nullable().default(null),
});

export type TAddProductReviewValidation = z.infer<typeof addProductReviewSchema>;
