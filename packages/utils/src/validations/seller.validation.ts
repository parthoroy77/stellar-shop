import z from "zod";
import { addressValidationSchema } from "./address.validation";
import { imageFileSchema } from "./file.validation";

export const sellerOnboardingValidationSchema = z
  .object({
    banner: imageFileSchema,
    logo: imageFileSchema,
    shopName: z.string(),
    shopDescription: z.string(),
    contactNumber: z.string(),
    businessEmail: z.string().email().optional(),
  })
  .extend({ ...addressValidationSchema.shape });

export type TSellerOnboardingValidation = z.infer<typeof sellerOnboardingValidationSchema>;
