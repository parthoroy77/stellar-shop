import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
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

const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;
  const response = await AuthServices.login(payload);

  res.cookie("session_token", response.sessionToken, {
    httpOnly: config.NODE_ENV === "production",
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
    maxAge: Number(response.expiresAt),
  });

  ApiResponse(res, {
    data: response,
    message: "User logged in successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const userLogout = asyncHandler(async (req: Request, res: Response) => {
  const { session_token } = req.cookies;
  console.log(req.user);
  const response = await AuthServices.logout({ userId: req.user.id, sessionToken: session_token });

  res.clearCookie("session_token");

  ApiResponse(res, {
    data: response,
    message: "User logged out successfully",
    success: true,
    statusCode: StatusCodes.OK,
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
  userLogin,
  userLogout,
  resendUserVerificationEmail,
  verifyUserEmail,
};
