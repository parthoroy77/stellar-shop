import { z } from "@repo/utils/validations";

export const resendVerificationEmailSchema = z.object({
  email: z.string().email(),
});

export const verifyAccountSchema = z.object({
  token: z.string(),
});
export const sessionRefreshSchema = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});
