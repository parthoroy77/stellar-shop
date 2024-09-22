import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { AuthServices } from "./auth.services";

const userRegistration = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;

  const response = await AuthServices.register(payload);

  ApiResponse(res, {
    data: {},
    message: "User registered successfully. Check your email for verification.",
    success: true,
    statusCode: StatusCodes.CREATED,
  });
});

export const AuthControllers = {
  userRegistration,
};
