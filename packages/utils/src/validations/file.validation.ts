import { z } from "zod";
import { ALLOWED_IMAGE_EXTENSIONS, MAX_IMAGE_SIZE } from "../constants/file.constant";

// Helper function to check if the file type is an image
function checkImageType(file: File) {
  const fileType = file && file.name.split(".").pop()?.toLowerCase();
  return fileType && ALLOWED_IMAGE_EXTENSIONS.includes(fileType);
}

// Zod schema to validate an image file
export const imageFileSchema = z
  .any()
  .refine((file: File) => file instanceof File && file.size > 0, {
    message: "File is required",
  })
  .refine((file: File) => file && file.size <= MAX_IMAGE_SIZE, {
    message: "Max size is 5MB",
  })
  .refine((file: File) => checkImageType(file), {
    message: "Image file format not supported",
  });
