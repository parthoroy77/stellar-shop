import { z } from "zod";
import { ALLOWED_IMAGE_EXTENSIONS, MAX_IMAGE_SIZE } from "../constants/file.constant";
import { ExtendedFile } from "../types";

// Helper function to check if the file type is an image
function checkImageType(file: ExtendedFile) {
  const fileType = file && (file?.name || file?.filename)?.split(".")?.pop()?.toLowerCase();
  return fileType && ALLOWED_IMAGE_EXTENSIONS.includes(`.${fileType}`);
}

// Zod schema to validate an image file
export const imageFileSchema = z
  .any()
  .refine((file: ExtendedFile) => file, {
    message: "File is required",
  })
  .refine((file: ExtendedFile) => file && file.size <= MAX_IMAGE_SIZE, {
    message: "Max size is 5MB",
  })
  .refine((file: ExtendedFile) => checkImageType(file), {
    message: "Image file format not supported",
  });
