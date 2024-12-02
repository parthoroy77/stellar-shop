import z from "zod";

// user registration schema
export const registrationSchema = z.object({
  fullName: z.string().min(4).max(20),
  email: z.string().email(),
  password: z.string(),
});

// user registration schema data type
export type TRegistrationValidation = z.infer<typeof registrationSchema>;

// user login schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// user login schema data type
export type TLoginValidation = z.infer<typeof loginSchema>;
