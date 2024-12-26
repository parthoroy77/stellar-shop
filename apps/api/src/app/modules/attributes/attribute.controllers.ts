import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { AttributeServices } from "./attribute.services";

const createAttribute = asyncHandler(async (req, res) => {
  const payload = req.body;
  await AttributeServices.create(payload);
  ApiResponse(res, {
    data: {},
    message: "Attribute created successfully!",
    statusCode: StatusCodes.CREATED,
    success: true,
  });
});

const getAttributesWithValues = asyncHandler(async (_, res) => {
  const result = await AttributeServices.getAllWithValues();
  ApiResponse(res, {
    data: result,
    message: "Attribute & values fetched successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

const getAllAttributes = asyncHandler(async (_, res) => {
  const result = await AttributeServices.getAll();
  ApiResponse(res, {
    data: result,
    message: "Attribute fetched successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

const getValuesByAttribute = asyncHandler(async (req, res) => {
  const { attributeId } = req.params;
  if (!attributeId) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Attribute id not found!");
  }
  const result = await AttributeServices.getAllValuesByAttrId(+attributeId);

  ApiResponse(res, {
    data: result,
    message: "Attribute values fetched successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

export const AttributeControllers = {
  createAttribute,
  getAllAttributes,
  getAttributesWithValues,
  getValuesByAttribute,
};
