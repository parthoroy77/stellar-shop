import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { ProductReviewServices } from "./product-review.services";

const addReviewToProduct = asyncHandler(async (req, res) => {
  const payload = req.body;

  const files = req.files;

  await ProductReviewServices.create(
    payload,
    req.user.id!,
    files?.length ? (files as Express.Multer.File[]).map((file) => file.path) : []
  );

  ApiResponse(res, {
    data: {},
    success: true,
    statusCode: StatusCodes.OK,
    message: "Review added to product successfully!",
  });
});

export const ProductReviewController = {
  addReviewToProduct,
};
