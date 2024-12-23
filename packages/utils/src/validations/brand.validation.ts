import z from "zod";
import { imageFileSchema } from "./file.validation";

export const createBrandValidationSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  logo: imageFileSchema,
});

export type TCreateBrandValidation = z.infer<typeof createBrandValidationSchema>;
