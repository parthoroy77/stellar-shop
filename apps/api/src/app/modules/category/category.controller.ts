import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { CategoryServices } from "./category.services";

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;
  const fileLocalPath = req?.file?.path;

  if (!fileLocalPath) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Category image file not found!");
  }

  const response = await CategoryServices.create(payload, fileLocalPath, req.user.id);

  ApiResponse(res, {
    data: response,
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Category created successfully!",
  });
});

export const CategoryControllers = {
  createCategory,
};
