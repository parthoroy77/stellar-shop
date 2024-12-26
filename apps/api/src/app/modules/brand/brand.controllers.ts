import { StatusCodes } from "http-status-codes";
import { BrandServices } from "./brand.services";
import asyncHandler from "../../handlers/asyncHandler";
import { ApiError } from "../../handlers/ApiError";
import { ApiResponse } from "../../handlers/ApiResponse";
import pick from "../../utils/pick";

const createBrand = asyncHandler(async (req, res) => {
  const payload = req.body;
  const filePath = req.file?.path;

  if (!filePath) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Brand logo image not found!");
  }

  const result = await BrandServices.create(payload, filePath, req.user.id!);

  ApiResponse(res, {
    data: result,
    message: "Brand uploaded successfully!",
    statusCode: StatusCodes.CREATED,
    success: true,
  });
});

const getAllBrands = asyncHandler(async (req, res) => {
  const filters = pick(req.query, ["query"]);

  const result = await BrandServices.getAll(filters?.query as unknown as string);

  ApiResponse(res, {
    data: result,
    message: "Brands retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

export const BrandControllers = {
  createBrand,
  getAllBrands,
};
