import { StatusCodes } from "http-status-codes";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { ApiError } from "./ApiError";

export const handleCloudinaryUpload = async (filePath: string, folderName: string) => {
  const uploadedFile = await uploadOnCloudinary(filePath, folderName);
  if (!uploadedFile) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while doing server upload!");
  }
  return uploadedFile;
};
