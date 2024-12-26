import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import pick from "../../utils/pick";
import { SHIPPING_OPTION_FILTERABLE_KEYS } from "./shipping.constants";
import { ShippingServices } from "./shipping.services";

const createShippingOption = asyncHandler(async (req, res) => {
  const payload = req.body;
  await ShippingServices.createOption(payload);

  ApiResponse(res, {
    data: {},
    message: "Shipping option added successfully!",
    statusCode: StatusCodes.CREATED,
    success: true,
  });
});

const getAllShippingOptions = asyncHandler(async (req, res) => {
  const filters = pick(req.query, [...SHIPPING_OPTION_FILTERABLE_KEYS, "query"]);

  const result = await ShippingServices.getAllOptions(filters);

  ApiResponse(res, {
    data: result,
    message: "Shipping option fetched successfully!",
    statusCode: StatusCodes.CREATED,
    success: true,
  });
});

export const ShippingControllers = { createShippingOption, getAllShippingOptions };
