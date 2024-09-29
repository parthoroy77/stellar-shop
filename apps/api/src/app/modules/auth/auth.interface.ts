import { RefreshToken, Session } from "@repo/prisma/client";

export type TRegistrationPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  session: Session;
  refreshToken: RefreshToken;
};

export type TLogoutPayload = {
  sessionToken: string;
  userId: number;
};

export type TOTPVerifyPayload = {
  userId: number;
  otp: string;
};
