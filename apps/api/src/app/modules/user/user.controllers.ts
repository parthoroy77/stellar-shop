import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { getFilePath } from "../../utils/utils";
import { UserServices } from "./user.services";

const updateUserProfile = asyncHandler(async (req, res) => {
  const payload = req.body;
  await UserServices.updateProfile({ ...payload }, req.user.id!);
  ApiResponse(res, {
    data: {},
    statusCode: StatusCodes.OK,
    message: "Profile updated successfully!",
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

export const UserControllers = {
  updateUserProfile,
  updateUserAvatar,
  deleteUserAvatar,
};
