import { z } from "@repo/utils/validations";

export const updateSubOrderStatusValidationSchema = z.object({
  status: z.string(),
});
