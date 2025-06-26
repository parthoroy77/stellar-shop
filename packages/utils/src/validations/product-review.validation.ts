import z from "zod";
import { imageFileSchema } from "./file.validation";

export const addProductReviewSchema = z.object({
  productId: z.number(),
  rating: z.number().gt(0, "Add your rating").lte(5, "Rating must be less than or equal to 5"),
  description: z.string(),
  media: z.array(imageFileSchema).optional(),
});

export type TAddProductReviewValidation = z.infer<typeof addProductReviewSchema>;
