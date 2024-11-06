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

  const result = await CategoryServices.create(payload, fileLocalPath, req.user.id);

  ApiResponse(res, {
    data: result,
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
    message: "Categories retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
    meta,
  });
});

const getCategoriesWithAllChildren = asyncHandler(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllWithChildren();
  ApiResponse(res, {
    data: result,
    message: "Categories with children retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

const getAllParentCategories = asyncHandler(async (req: Request, res: Response) => {
  const query = pick(req.query, ["query", "level"]);
  const result = await CategoryServices.getAllParentCategories(query);
  ApiResponse(res, {
    data: result,
    message: "Parent categories retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

const deleteCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Category id not found!");
  }
  await CategoryServices.deleteACategory(Number(categoryId));
  ApiResponse(res, {
    data: {},
    message: "Category deleted successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getCategoriesWithAllChildren,
  getAllParentCategories,
  deleteCategoryById,
};
