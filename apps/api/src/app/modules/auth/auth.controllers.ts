import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { AuthServices } from "./auth.services";

const userRegistration = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;

  await AuthServices.register(payload);

  ApiResponse(res, {
    data: {},
    message: "User registered successfully. Check your email for verification.",
    success: true,
    statusCode: StatusCodes.CREATED,
  });
});

const resendUserVerificationEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  await AuthServices.resendVerificationEmail(email);
  ApiResponse(res, {
    data: {},
    message: "New verification email has been sent. Check your email.",
    success: true,
    statusCode: StatusCodes.OK,
  });
});
const verifyUserEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  await AuthServices.verifyEmail(token);
  ApiResponse(res, {
    data: {},
    message: "Your account has been verified.",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

export const AuthControllers = {
  userRegistration,
  resendUserVerificationEmail,
  verifyUserEmail,
};
