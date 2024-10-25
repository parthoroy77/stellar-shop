import { createCategoryValidationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { upload } from "../../middleware/multer.middleware";
import { CategoryControllers } from "./category.controller";

const router = Router();

// TODO: Add role restriction only admin can create!
router.post(
  "/create",
  upload.single("attachment"),
  zodSafeParse(createCategoryValidationSchema.omit({ attachment: true })),
  authMiddleware(),
  CategoryControllers.createCategory
);

const CategoryRoutes = router;

export default CategoryRoutes;
