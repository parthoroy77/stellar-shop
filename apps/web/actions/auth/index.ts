"use server";

import { fetcher } from "@/lib/fetcher";
import { registrationSchema, z } from "@repo/utils/validations";
const baseUrl = process.env.API_URL;

export const registerUser = async (data: z.infer<typeof registrationSchema>) => {
  return await fetcher("/auth/register", { method: "POST", body: data, cache: "no-cache" });
};
