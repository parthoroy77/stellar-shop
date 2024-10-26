import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PAGINATION_KEYS } from "../../constants";
import { ApiError } from "../../handlers/ApiError";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import pick from "../../utils/pick";
import { CATEGORY_FILTER_KEYS } from "./category.constant";
import { CategoryServices } from "./category.services";
import { TCategoryFilters } from "./category.types";

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

const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const filters = pick(req.query, [...CATEGORY_FILTER_KEYS, "query"]) as TCategoryFilters;
  const paginateOptions = pick(req.query, PAGINATION_KEYS);

  const { result, meta } = await CategoryServices.getAll(filters, paginateOptions);

  ApiResponse(res, {
    data: result,
    message: "Category retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
    meta,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
};
