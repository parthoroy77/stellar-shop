import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
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
  const result = await CartServices.getUserCart(req.user.id!);
  ApiResponse(res, {
    data: result,
    message: "Cart retrieved successfully!",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const clearUserAllCartItems = asyncHandler(async (req, res) => {
  await CartServices.clearUserCart(req.user.id!);
  ApiResponse(res, {
    data: {},
    message: "Cart list cleared successfully!",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const deleteUserCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Cart item id not found!");
  }
  await CartServices.deleteUserCartItem(+id, req.user.id!);
  ApiResponse(res, {
    data: {},
    message: "Cart item deleted successfully!",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const updateUserCartItem = asyncHandler(async (req, res) => {
  const payload = req.body;
  await CartServices.updateCartItem(payload, req.user.id!);
  ApiResponse(res, {
    data: {},
    message: "Cart item updated successfully!",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const calculateCartSummary = asyncHandler(async (req, res) => {
  const payload = req.body.items as string[];
  const result = await CartServices.cartSummary(
    payload.map((id) => +id),
    req.user.id!
  );
  ApiResponse(res, {
    data: result,
    message: "Cart summary retrieved successfully!",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

export const CartControllers = {
  manageAddProductToCart,
  getUserAllCartItems,
  clearUserAllCartItems,
  deleteUserCartItem,
  updateUserCartItem,
  calculateCartSummary,
};
