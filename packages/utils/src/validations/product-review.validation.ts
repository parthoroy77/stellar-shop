import z from "zod";
import { imageFileSchema } from "./file.validation";

export const addProductReviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  rating: z.enum(["1", "2", "3", "4", "5"], { message: "Rating must be between 1 to 5" }),
  description: z.string().min(1, "Description is required"),
  files: z.array(imageFileSchema).max(2, "Maximum 2 images allowed").optional(),
});

export type TAddProductReviewValidation = z.infer<typeof addProductReviewSchema>;
