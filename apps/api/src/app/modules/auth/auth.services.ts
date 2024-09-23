import { defaultTemplate } from "@repo/email-service";
import prisma from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { ApiError } from "../../handlers/ApiError";
import emailService from "../../services/emailService";
import { TAuth } from "./auth.interface";
import { generateToken, hashPassword } from "./auth.utils";

const register = async (payload: TAuth) => {
  const { email, password, fullName } = payload;

  // check user exists
  const isExists = await prisma.user.findUnique({ where: { email } });

  if (isExists) {
    throw new ApiError(StatusCodes.CONFLICT, "User Already Exists With This Email");
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
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Registration Failed");
  }

  // generate verification link
  const verificationToken = await generateToken({ userId: newUser.id }, config.jwt_access_secret as string, "1h");

  // TODO: send verification email

  const html = defaultTemplate(verificationToken);
  await emailService.sendEmail({ to: email, subject: "Verify Account", html });

  return;
};

export const AuthServices = {
  register,
};
