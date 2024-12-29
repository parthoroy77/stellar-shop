import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { AddressServices } from "./address.services";

const createUserAddress = asyncHandler(async (req, res) => {
  const payload = req.body;

  const result = await AddressServices.createAddress({ ...payload, userId: +req.user.id! });

  ApiResponse(res, {
    statusCode: StatusCodes.CREATED,
    data: result,
    message: "Address added successfully!",
    success: true,
  });
});

const createUserShippingAddress = asyncHandler(async (req, res) => {
  const payload = req.body;

  const result = await AddressServices.createShippingAddress({ ...payload, userId: +req.user.id! });

  ApiResponse(res, {
    statusCode: StatusCodes.CREATED,
    data: result,
    message: "Shipping Address added successfully!",
    success: true,
  });
});

const getAllUserAddresses = asyncHandler(async (req, res) => {
  const result = await AddressServices.getAllAddress(req.user.id!);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    data: result,
    message: "Address retrieved successfully!",
    success: true,
  });
});

const getAllUserShippingAddresses = asyncHandler(async (req, res) => {
  const result = await AddressServices.getAllShippingAddress(req.user.id!);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    data: result,
    message: "Shipping Address retrieved successfully!",
    success: true,
  });
});

export const AddressControllers = {
  createUserAddress,
  createUserShippingAddress,
  getAllUserAddresses,
  getAllUserShippingAddresses,
};
