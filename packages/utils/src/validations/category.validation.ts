import z from "zod";
import { CategoryLevels } from "../types";
import { imageFileSchema } from "./file.validation";

// user category validation schema
export const createCategoryValidationSchema = z.object({
  categoryName: z.string(),
  description: z.string().min(20).max(60),
  level: z.enum([CategoryLevels.CATEGORY, CategoryLevels.SUB_CATEGORY, CategoryLevels.COLLECTION]),
  parentId: z.string().optional(),
  attachment: imageFileSchema,
});

// user category validation schema
export type TCreateCategoryValidation = z.infer<typeof createCategoryValidationSchema>;
