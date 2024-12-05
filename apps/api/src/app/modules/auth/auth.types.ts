import { UserRole } from "@repo/prisma/client";

export type TRegistrationPayload = {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
};

export type TLoginPayload = {
  email: string;
  password: string;
  role: UserRole;
};

export type TLogoutPayload = {
  sessionToken: string;
  userId: number;
};

export type TOTPVerifyPayload = {
  userId: number;
  otp: string;
};
