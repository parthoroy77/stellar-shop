import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import config from "../config";
import { ApiError } from "../handlers/ApiError";
import logger from "../logger";

// Cloudinary config
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// Upload file to Cloudinary
export const uploadOnCloudinary = async (localFilePath: string, folderName: string) => {
  if (!localFilePath) {
    throw new ApiError(StatusCodes.NOT_FOUND, "File not found");
  }

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: folderName,
    });
    // Delete the local file after uploading to Cloudinary
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    logger.error("Cloudinary upload error:", error);
    // Ensure the local file is deleted even if the upload fails
    fs.unlinkSync(localFilePath);
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error uploading to Cloudinary");
  }
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId: string, resourceType: string = "image") => {
  if (!publicId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Public ID is required");
  }

  try {
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return response;
  } catch (error) {
    logger.error("Cloudinary deletion error:", error);
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while deleting from Cloudinary");
  }
};

// Fetch details of a file from Cloudinary
export const fetchFromCloudinary = async (publicId: string, resourceType: string = "image") => {
  if (!publicId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Public ID is required");
  }

  try {
    const response = await cloudinary.api.resource(publicId, {
      resource_type: resourceType,
    });
    return response;
  } catch (error) {
    logger.error("Cloudinary fetch error:", error);
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error fetching data from Cloudinary");
  }
};

// List files in a specific folder on Cloudinary
export const listFilesInCloudinaryFolder = async (folderName: string) => {
  try {
    const response = await cloudinary.api.resources({
      type: "upload",
      prefix: folderName,
      max_results: 500, // Adjust as needed
    });
    return response.resources;
  } catch (error) {
    logger.error("Cloudinary list error:", error);
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error fetching file list from Cloudinary");
  }
};
