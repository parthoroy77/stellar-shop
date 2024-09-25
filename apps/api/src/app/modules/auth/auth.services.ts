import prisma from "@repo/prisma/client";
import { parseTimeToDate } from "@repo/utils/functions";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { ApiError } from "../../handlers/ApiError";
import { TLoginPayload, TLogoutPayload, TRegistrationPayload } from "./auth.interface";
import { comparePassword, generateToken, hashPassword, sendVerificationEmail, verifyToken } from "./auth.utils";

// registration
const register = async (payload: TRegistrationPayload) => {
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

// login
const login = async (payload: TLoginPayload) => {
  // check if user exists
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    include: {
      password: {
        select: { hashPassword: true },
      },
    },
  });

  // if not exist return error
  if (!isUserExists) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password.");
  }

  // if not verified account then verify first
  if (isUserExists.status !== "ACTIVE" && !isUserExists.email) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Please verify your account first.");
  }

  // check password valid or not
  const isPasswordValid = comparePassword(payload.password, isUserExists?.password?.hashPassword as string);

  if (!isPasswordValid) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  // generate session token
  const token = await generateToken(
    { userId: isUserExists.id, role: isUserExists.role },
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string
  );

  // create session for that user
  const session = await prisma.session.create({
    data: {
      sessionToken: token,
      expiresAt: parseTimeToDate(config.jwt_access_token_expires_in as string),
      userId: isUserExists.id,
    },
  });

  if (!session) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong please try again");
  }

  return session;
};

const logout = async (payload: TLogoutPayload) => {
  await prisma.session.deleteMany({
    where: {
      userId: payload.userId,
      sessionToken: payload.sessionToken,
    },
  });
};

// request new account verification email
const resendVerificationEmail = async (payload: string) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: payload,
      status: "INACTIVE",
      emailVerified: false,
    },
    select: {
      id: true,
    },
  });
  if (!isUserExists) {
    throw new ApiError(StatusCodes.CONFLICT, "User doesn't exists or verified");
  }
  // send verification email
  sendVerificationEmail(payload, Number(isUserExists.id));

  return;
};

// account verification
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
  login,
  logout,
  resendVerificationEmail,
  verifyEmail,
};
