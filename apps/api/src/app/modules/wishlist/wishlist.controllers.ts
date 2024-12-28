import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { WishlistServices } from "./wishlist.services";

const manageAddProductToWishlist = asyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await WishlistServices.addToWishlist({ ...payload, userId: req.user.id });
  ApiResponse(res, {
    data: {},
    message: result.message,
    success: true,
    statusCode: result.status,
  });
});

export const WishlistControllers = {
  manageAddProductToWishlist,
};
