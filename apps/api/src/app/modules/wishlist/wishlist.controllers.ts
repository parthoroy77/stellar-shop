import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { WishlistServices } from "./wishlist.services";

const manageAddProductToWishlist = asyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await WishlistServices.toggleWishlist({ ...payload, userId: req.user.id });
  ApiResponse(res, {
    data: {},
    message: result.message,
    success: true,
    statusCode: result.status,
  });
});

const getUserAllWishlistItems = asyncHandler(async (req, res) => {
  const result = await WishlistServices.getUserWishlist(req.user.id!);
  ApiResponse(res, {
    data: result,
    message: "Wishlist retrieved successfully!",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const deleteUserWishlistItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await WishlistServices.deleteWishlistItem(+id!, req.user.id!);
  ApiResponse(res, {
    data: {},
    message: "Wishlist item deleted successfully!",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

export const WishlistControllers = {
  manageAddProductToWishlist,
  getUserAllWishlistItems,
  deleteUserWishlistItem,
};
