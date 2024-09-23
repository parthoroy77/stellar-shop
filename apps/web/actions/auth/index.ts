"use server";

import { getErrorMessage } from "@repo/utils/functions";
import { registrationSchema, z } from "@repo/utils/validations";
const baseUrl = process.env.API_URL;

export const registerUser = async (data: z.infer<typeof registrationSchema>) => {
  try {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    return result;
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      error: error,
      message: getErrorMessage(error),
    };
  }
};
