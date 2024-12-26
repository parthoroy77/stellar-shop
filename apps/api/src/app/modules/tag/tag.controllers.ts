import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { TagServices } from "./tag.services";

const createTag = asyncHandler(async (req, res) => {
  const payload = req.body;
  await TagServices.create(payload);
  ApiResponse(res, {
    data: {},
    message: "Tag created successfully!",
    statusCode: StatusCodes.CREATED,
    success: true,
  });
});
const bulkCreateTag = asyncHandler(async (req, res) => {
  const payload = req.body;
  await TagServices.bulkCreate(payload);
  ApiResponse(res, {
    data: {},
    message: "Tags created successfully!",
    statusCode: StatusCodes.CREATED,
    success: true,
  });
});

const getAllTags = asyncHandler(async (_, res) => {
  const result = await TagServices.getAll();
  ApiResponse(res, {
    data: result,
    message: "Tags fetched successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

export const TagControllers = {
  createTag,
  bulkCreateTag,
  getAllTags,
};
