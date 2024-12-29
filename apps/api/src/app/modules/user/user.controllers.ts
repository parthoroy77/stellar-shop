import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
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

export const UserControllers = {
  updateUserProfile,
};
