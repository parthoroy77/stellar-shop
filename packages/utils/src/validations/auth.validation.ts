import z from "zod";

// user registration schema
const registrationSchema = z.object({
  body: z.object({
    fullName: z.string().min(4).max(20),
    email: z.string().email(),
    password: z.string(),
  }),
});

export { registrationSchema };
