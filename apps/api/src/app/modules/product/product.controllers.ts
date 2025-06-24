import { createProductValidationSchema } from "@repo/utils/validations";
import { StatusCodes } from "http-status-codes";
import { PAGINATION_KEYS } from "../../constants";
import { ApiError } from "../../handlers/ApiError";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import pick from "../../utils/pick";
import { PRODUCT_FILTERABLE_KEYS } from "./product.constants";
import { ProductServices } from "./product.services";
import { TProductFilters } from "./product.types";
import { parseProductData, parseProductFilters } from "./product.utils";

const createProduct = asyncHandler(async (req, res) => {
  const transformedData = parseProductData(req.body, req.files as Express.Multer.File[]);
  const validatedData = createProductValidationSchema.parse(transformedData);
  await ProductServices.create(validatedData, +req.user.id!);
  ApiResponse(res, {
    data: {},
    message: "Your product upload request submitted, our team will review!",
    statusCode: StatusCodes.CREATED,
    success: true,
  });
});

const getAllPendingProducts = asyncHandler(async (_req, res) => {
  const result = await ProductServices.getPendingProducts();
  ApiResponse(res, {
    data: result,
    message: "Pending products retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

const approveProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  await ProductServices.productApproval(+productId!);
  ApiResponse(res, {
    data: {},
    message: "Product handled successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

const getAllNewlyArrivedProducts = asyncHandler(async (req, res) => {
  const paginateOption = pick(req.query, PAGINATION_KEYS);
  const { result, meta } = await ProductServices.getNewlyArrived(paginateOption);
  ApiResponse(res, {
    data: result,
    message: "New arrivals products retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
    meta,
  });
});

const getAllProductsByQuery = asyncHandler(async (req, res) => {
  const filters = parseProductFilters(req.query);
  const options = pick(req.query, PAGINATION_KEYS);
  const { result, meta } = await ProductServices.getProductsBySearch(filters, options);
  ApiResponse(res, {
    data: result,
    message: "Products retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
    meta,
  });
});

const getAllSellerProducts = asyncHandler(async (req, res) => {
  const { sellerId } = req.params;

  const options = pick(req.query, PAGINATION_KEYS);

  if (!sellerId) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Seller identifier not found!");
  }

  const { result, meta } = await ProductServices.getAllBySellerId(+sellerId, options);

  ApiResponse(res, {
    data: result,
    message: "Products retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
    meta,
  });
});

const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  if (!slug) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Product slug not found!");
  }

  const result = await ProductServices.getProductDetails({ slug });

  ApiResponse(res, {
    data: result,
    message: "Product retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Product id not found!");
  }

  const result = await ProductServices.getProductDetails({ productId: +id });

  ApiResponse(res, {
    data: result,
    message: "Product retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const filters = pick(req.query, PRODUCT_FILTERABLE_KEYS) as TProductFilters;

  const pagination = pick(req.query, PAGINATION_KEYS);

  const { result, meta } = await ProductServices.getAll(filters, pagination);

  ApiResponse(res, {
    data: result,
    message: "Product retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
    meta,
  });
});

const getAllProductsByCategory = asyncHandler(async (req, res) => {
  const { categorySlug } = req.params;
  const filters = parseProductFilters(req.query);
  const pagination = pick(req.query, PAGINATION_KEYS);

  if (!categorySlug) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Category slug not found!");
  }

  const { result, meta } = await ProductServices.getAllByCategory(categorySlug, filters, pagination);

  ApiResponse(res, {
    data: result,
    message: "Product retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
    meta,
  });
});

const getBestSellingProducts = asyncHandler(async (req, res) => {
  const { limit, skip } = pick(req.query, ["limit", "skip"]);
  const result = await ProductServices.getBestSelling({ limit: Number(limit) || 10, skip: Number(skip) || 0 });
  ApiResponse(res, {
    data: result,
    message: "Best selling products retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

export const ProductControllers = {
  createProduct,
  getAllPendingProducts,
  approveProduct,
  getAllNewlyArrivedProducts,
  getProductBySlug,
  getProductById,
  getAllProductsByQuery,
  getAllSellerProducts,
  getAllProducts,
  getAllProductsByCategory,
  getBestSellingProducts,
};
