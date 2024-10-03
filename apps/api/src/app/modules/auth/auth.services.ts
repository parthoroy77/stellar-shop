import prisma, { RefreshToken, Session, User } from "@repo/prisma/client";
import { parseTimeToDate } from "@repo/utils/functions";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { ApiError } from "../../handlers/ApiError";
import { TLoginPayload, TLogoutPayload, TRegistrationPayload } from "./auth.interface";
import { comparePassword, generateToken, hashPassword, sendVerificationEmail, verifyToken } from "./auth.utils";

// registration
const register = async (payload: TRegistrationPayload): Promise<void> => {
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

// TODO: Later on we will modify while integrating otp
// login

const login = async (payload: TLoginPayload): Promise<{ session: Session; refreshToken: RefreshToken }> => {
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
  if (isUserExists.status !== "ACTIVE" && !isUserExists.emailVerified) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Please verify your account first.");
  }

  // check password valid or not
  const isPasswordValid = comparePassword(payload.password, isUserExists?.password?.hashPassword as string);

  if (!isPasswordValid) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const newSessionToken = await generateToken(
    { userId: isUserExists.id, role: isUserExists.role },
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string
  );
  const newRefreshToken = await generateToken(
    { userId: isUserExists.id },
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expires_in as string
  );

  const [session, refreshToken] = await prisma.$transaction([
    prisma.session.create({
      data: {
        userId: isUserExists.id,
        sessionToken: newSessionToken,
        expiresAt: parseTimeToDate(config.jwt_access_token_expires_in as string),
      },
    }),
    prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: isUserExists.id,
        expiresAt: parseTimeToDate(config.jwt_refresh_token_expires_in as string),
      },
    }),
  ]);

  return {
    session,
    refreshToken,
  };

  // // check this user already request many times or not
  // const otpLimit = await checkOtpRequestLimit(isUserExists.id, "LOGIN");

  // if (otpLimit) {
  //   throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "User has already requested more than 5 OTPs today");
  // }

  // // create otp
  // const otpCode = generateOtp();
  // const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

  // // create otp request
  // const otpRequest = await prisma.oTPRequest.create({
  //   data: {
  //     code: otpCode,
  //     userId: isUserExists.id,
  //     expiresAt: otpExpiresAt,
  //     purpose: "LOGIN",
  //   },
  // });

  // if (!otpRequest) {
  //   throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while executing");
  // }

  // // TODO: make an email template or utils
  // const html = defaultTemplate(otpRequest);

  // await sendEmail(isUserExists.email, "Verify OTP", html);
};

// After otp user should login
// OTP verification for login
// const verifyOTPLogin = async (payload: TOTPVerifyPayload) => {
//   const otpRecord = await prisma.oTPRequest.findFirst({
//     where: {
//       userId: payload.userId,
//       code: payload.otp,
//       expiresAt: {
//         gt: new Date(),
//       },
//       purpose: "LOGIN",
//       verified: false,
//     },
//   });

//   if (!otpRecord) {
//     throw new ApiError(StatusCodes.UNAUTHORIZED, "OTP invalid or expired!");
//   }

//   const user = await prisma.user.findUnique({ where: { id: payload.userId } });

//   if (!user) {
//     throw new ApiError(StatusCodes.NOT_FOUND, "Requested user not found! ");
//   }

//   const newSessionToken = await generateToken(
//     { userId: user.id, role: user.role },
//     config.jwt_access_secret as string,
//     config.jwt_access_token_expires_in as string
//   );
//   const newRefreshToken = await generateToken(
//     { userId: user.id },
//     config.jwt_refresh_secret as string,
//     config.jwt_refresh_token_expires_in as string
//   );

//   const [session, refreshToken] = await prisma.$transaction([
//     prisma.session.create({
//       data: {
//         userId: user.id,
//         sessionToken: newSessionToken,
//         expiresAt: parseTimeToDate(config.jwt_access_token_expires_in as string),
//       },
//     }),
//     prisma.refreshToken.create({
//       data: {
//         token: newRefreshToken,
//         userId: user.id,
//         expiresAt: parseTimeToDate(config.jwt_refresh_token_expires_in as string),
//       },
//     }),
//   ]);

//   return {
//     session,
//     refreshToken,
//   };
// };

const logout = async (payload: TLogoutPayload): Promise<void> => {
  await prisma.$transaction([
    prisma.session.deleteMany({
      where: {
        userId: payload.userId,
        sessionToken: payload.sessionToken,
      },
    }),
    prisma.refreshToken.deleteMany({
      where: {
        userId: payload.userId,
      },
    }),
  ]);
  return;
};

// request new account verification email
const resendVerificationEmail = async (payload: string): Promise<void> => {
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
const verifyEmail = async (payload: string): Promise<void> => {
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

// refresh session
const refreshSession = async (payload: string): Promise<{ session: Session; refreshToken: RefreshToken }> => {
  if (!payload) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Session refresh credential not found.");
  }

  const decode = await verifyToken(payload, config.jwt_refresh_secret as string);
  if (!decode) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid refresh credential.");
  }

  const tokenRecord = await prisma.refreshToken.findFirst({
    where: {
      userId: decode.userId!,
      token: payload,
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      user: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  });

  if (!tokenRecord) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Refresh credential invalid or expired.");
  }

  const newRefreshToken = await generateToken(
    { userId: tokenRecord.user.id },
    config.jwt_refresh_secret!,
    config.jwt_refresh_token_expires_in!
  );
  const newSessionToken = await generateToken(
    { userId: tokenRecord.user.id, role: tokenRecord.user.role },
    config.jwt_access_secret!,
    config.jwt_access_token_expires_in!
  );
  const [refreshToken, session] = await prisma.$transaction([
    prisma.refreshToken.create({
      data: {
        userId: tokenRecord.user.id,
        token: newRefreshToken,
        expiresAt: parseTimeToDate(config.jwt_refresh_token_expires_in!),
      },
    }),
    prisma.session.create({
      data: {
        sessionToken: newSessionToken,
        userId: tokenRecord.user.id,
        expiresAt: parseTimeToDate(config.jwt_access_token_expires_in!),
      },
    }),
  ]);

  return {
    session,
    refreshToken,
  };
};

const getSession = async (payload: number): Promise<{ session: Session; user: User }> => {
  const session = await prisma.session.findFirst({
    where: {
      userId: payload,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An internal server error occurred");
  }

  return {
    session: session,
    user: session.user,
  };
};

export const AuthServices = {
  register,
  login,
  logout,
  resendVerificationEmail,
  verifyEmail,
  refreshSession,
  getSession,
};
