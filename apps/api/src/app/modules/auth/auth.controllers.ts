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

const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;
  const { session, refreshToken } = await AuthServices.login(payload);

  res.cookie("session_token", session.sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(session.expiresAt),
  });

  res.cookie("refresh_token", refreshToken.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(refreshToken.expiresAt),
  });

  ApiResponse(res, {
    data: {
      session,
      refreshToken,
    },
    message: "User logged in successfully.",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const userVerifyOTPLogin = asyncHandler(async (req: Request, res: Response) => {
  // const payload
});

const userLogout = asyncHandler(async (req: Request, res: Response) => {
  const { session_token } = req.cookies;
  const response = await AuthServices.logout({ userId: req.user.id, sessionToken: session_token });

  res.clearCookie("session_token");
  res.clearCookie("refresh_token");

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

const userSessionRefresh = asyncHandler(async (req: Request, res: Response) => {
  const { refresh_token } = req.cookies;
  const { session, refreshToken } = await AuthServices.refreshSession(refresh_token);
  res.cookie("session_token", session.sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(session.expiresAt),
  });

  res.cookie("refresh_token", refreshToken.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(refreshToken.expiresAt),
  });

  ApiResponse(res, {
    data: {
      session,
      refreshToken,
    },
    message: "New session created successfully.",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const getUserSession = asyncHandler(async (req: Request, res: Response) => {
  ApiResponse(res, {
    data: {
      user: req.user,
    },
    message: "User session retrieve successfully.",
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
  userSessionRefresh,
  getUserSession,
};
