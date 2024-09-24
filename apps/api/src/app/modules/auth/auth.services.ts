import prisma from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { ApiError } from "../../handlers/ApiError";
import { TAuth } from "./auth.interface";
import { hashPassword, sendVerificationEmail, verifyToken } from "./auth.utils";

const register = async (payload: TAuth) => {
  const { email, password, fullName } = payload;

  // check user exists
  const isExists = await prisma.user.findUnique({ where: { email } });

  if (isExists) {
    throw new ApiError(StatusCodes.CONFLICT, "User already exists with this email");
  }

  // hash password
  const encryptedPassword = await hashPassword(password);

  // create new user
  const newUser = await prisma.user.create({
    data: {
      email,
      fullName,
      password: {
        create: {
          hashPassword: encryptedPassword,
        },
      },
    },
  });

  if (!newUser) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Registration failed");
  }

  // send verification email
  if (config.NODE_ENV === "production") {
    sendVerificationEmail(email, newUser.id);
  }

  return;
};

const resendVerificationEmail = async (payload: string) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: payload,
      status: "INACTIVE",
      emailVerified: false,
    },
  });
  if (!isUserExists) {
    throw new ApiError(StatusCodes.CONFLICT, "User doesn't exists or verified");
  }
  // send verification email
  sendVerificationEmail(payload, Number(isUserExists.id));

  return;
};

const verifyEmail = async (payload: string) => {
  // TODO: enable throttling
  const decoded = await verifyToken(payload, config.jwt_access_secret as string);
  if (!decoded) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid or expired verification token.");
  }

  await prisma.user.update({
    where: { id: Number(decoded.userId) },
    data: {
      emailVerified: true,
      status: "ACTIVE",
    },
  });

  // TODO: after verification sent a welcome email

  return;
};

export const AuthServices = {
  register,
  resendVerificationEmail,
  verifyEmail,
};
