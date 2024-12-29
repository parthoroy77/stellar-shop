import z from "zod";

export const userProfileUpdateValidation = z.object({
  fullName: z.string().optional(),
  phoneNumber: z.string().optional(),
  phonePrefixCode: z.string().optional(),
});

export type TUserProfileValidation = z.infer<typeof userProfileUpdateValidation>;
