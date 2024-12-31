import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { CartServices } from "./cart.services";

const manageAddProductToCart = asyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await CartServices.addToCart({ ...payload, userId: req.user.id });
  ApiResponse(res, {
    data: {},
    message: result.message,
    success: true,
    statusCode: result.status,
  });
});

const getUserAllCartItems = asyncHandler(async (req, res) => {
  await CartServices.getUserCart(req.user.id!);
  ApiResponse(res, {
    data: {},
    message: "User cart retrieved successfully!",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const clearUserAllCartItems = asyncHandler(async (req, res) => {
  await CartServices.clearUserCart(req.user.id!);
  ApiResponse(res, {
    data: {},
    message: "User cart cleared successfully!",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

export const CartControllers = {
  manageAddProductToCart,
  getUserAllCartItems,
  clearUserAllCartItems,
};
