import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { AddressServices } from "./address.services";

const createAddress = asyncHandler(async (req, res) => {
  const payload = req.body;

  const result = await AddressServices.create({ ...payload, userId: req.user.id });

  ApiResponse(res, {
    statusCode: StatusCodes.CREATED,
    data: result,
    message: "Address uploaded successfully!",
    success: true,
  });
});

export const AddressControllers = {
  createAddress,
};
