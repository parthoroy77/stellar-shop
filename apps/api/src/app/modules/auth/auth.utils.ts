import { defaultTemplate } from "@repo/email-service";
import prisma from "@repo/prisma/client";
import { compare, hash } from "bcryptjs";
import { endOfDay, startOfDay } from "date-fns";
import { StatusCodes } from "http-status-codes";
import { importJWK, JWTPayload, jwtVerify, SignJWT } from "jose";
import config from "../../config";
import { ApiError } from "../../handlers/ApiError";
import { sendEmail } from "../../services/emailService";

const hashPassword = async (password: string) => {
  try {
    return await hash(password, Number(config.salt_rounds));
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to hash password");
  }
};

const comparePassword = async (password: string, hashPassword: string) => {
  try {
    return await compare(password, hashPassword);
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to compare password");
  }
};

const generateToken = async (payload: JWTPayload, secret: string, expiry: string) => {
  // Import the secret as a JWK key
  const signedKey = await importJWK({ k: secret, alg: "HS256", kty: "oct" });
  // generate the token
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(signedKey);

  // return token
  return token;
};

const verifyToken = async (token: string, secret: string): Promise<JWTPayload | null> => {
  try {
    // Import the secret as a JWK key
    const key = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

    // Verify the token
    const { payload } = await jwtVerify(token, key);

    // If verification is successful, return the payload
    return payload;
  } catch (error) {
    return null;
  }
};

const sendVerificationEmail = async (email: string, userId: number) => {
  // generate verification token
  const token = await generateToken({ userId }, config.jwt_access_secret as string, "1h");
  // Verification email template
  const link = `${config.client_url}/verify?token=${token}`;
  const html = defaultTemplate(link);
  // send mail
  await sendEmail(email, "Account Verification Request", html);
};

const generateOtp = () => {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  return otpCode;
};

const checkOtpRequestLimit = async (userId: number, purpose: "LOGIN" | "RESET_PASSWORD") => {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const otpCount = await prisma.oTPRequest.count({
    where: {
      userId: userId,
      purpose: purpose,
      createdAt: {
        gte: todayStart, // Greater than or equal to start of the day
        lte: todayEnd, // Less than or equal to end of the day
      },
    },
  });

  // Check if the count exceeds the limit
  if (otpCount >= 5) {
    return true; // User has already requested more than 5 OTPs today
  }

  return false; // User has not exceeded the limit
};

export {
  comparePassword,
  generateOtp,
  generateToken,
  hashPassword,
  sendVerificationEmail,
  verifyToken,
  checkOtpRequestLimit,
};
