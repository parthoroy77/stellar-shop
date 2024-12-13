import z from "zod";
import { addressValidationSchema } from "./address.validation";
import { imageFileSchema } from "./file.validation";

export const sellerOnboardingValidationSchema = z.object({
  banner: imageFileSchema,
  logo: imageFileSchema,
  storeName: z.string(),
  description: z.string(),
  contactNumber: z.string(),
  businessEmail: z.string().email().optional(),
  address: addressValidationSchema,
});

export type TSellerOnboardingValidation = z.infer<typeof sellerOnboardingValidationSchema>;
