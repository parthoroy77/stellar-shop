import { StatusCodes } from "http-status-codes";
import { PAGINATION_KEYS } from "../../constants";
import { ApiError } from "../../handlers/ApiError";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { TPaginateOption } from "../../utils/calculatePagination";
import pick from "../../utils/pick";
import { getFilePath } from "../../utils/utils";
import { USER_FILTERABLE_KEYS } from "./user.constants";
import { UserServices } from "./user.services";
import { TUserFilters } from "./user.types";

const updateUserProfile = asyncHandler(async (req, res) => {
  const payload = req.body;

  const { message, statusCode } = await UserServices.updateProfile({ ...payload }, req.user.id!);

  ApiResponse(res, {
    data: {},
    statusCode,
    message,
    success: true,
  });
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  console.log(req.file);
  const filePath = getFilePath(req, "avatar");
  if (!filePath) {
    throw new ApiError(StatusCodes.NOT_FOUND, "File not found!");
  }

  await UserServices.updateAvatar(req.user.id!, filePath);
  ApiResponse(res, {
    data: {},
    statusCode: StatusCodes.OK,
    message: "Avatar updated successfully!",
    success: true,
  });
});

const deleteUserAvatar = asyncHandler(async (req, res) => {
  await UserServices.deleteAvatar(req.user.id!);
  ApiResponse(res, {
    data: {},
    statusCode: StatusCodes.OK,
    message: "Avatar deleted successfully!",
    success: true,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const filters = pick(req.query, USER_FILTERABLE_KEYS) as TUserFilters;

  const paginateOptions = pick(req.query, PAGINATION_KEYS) as TPaginateOption;

  const { result, meta } = await UserServices.getAll(filters, paginateOptions);

  ApiResponse(res, {
    data: result,
    statusCode: StatusCodes.OK,
    message: "User fetched successfully!",
    success: true,
    meta,
  });
});

export const UserControllers = {
  updateUserProfile,
  updateUserAvatar,
  deleteUserAvatar,
  getAllUsers,
};
