import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Helper function to check if the file type is an image
function checkImageType(file: File) {
  const acceptedImageTypes = ["jpeg", "jpg", "png"];
  const fileType = file && file.name.split(".").pop()?.toLowerCase();
  return fileType && acceptedImageTypes.includes(fileType);
}

// Zod schema to validate an image file
export const imageFileSchema = z
  .any()
  .refine((file: File) => file instanceof File && file.size > 0, {
    message: "File is required",
  })
  .refine((file: File) => file && file.size <= MAX_FILE_SIZE, {
    message: "Max size is 5MB",
  })
  .refine((file: File) => checkImageType(file), {
    message: "Only .jpeg, .jpg, .png, .gif formats are supported",
  });
