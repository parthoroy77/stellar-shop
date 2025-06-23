import { UserRole } from "@repo/prisma/client";
import { createCategoryValidationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { upload } from "../../middleware/multer.middleware";
import { CategoryControllers } from "./category.controller";

const router = Router();

router.post(
  "/",
  authMiddleware(UserRole.ADMIN),
  upload.single("attachment"),
  zodSafeParse(createCategoryValidationSchema.omit({ attachment: true })),
  CategoryControllers.createCategory
);

router.get("/", CategoryControllers.getAllCategories);

router.get("/parents", CategoryControllers.getAllParentCategories);

router.get("/with-children", CategoryControllers.getCategoriesWithAllChildren);

router.patch(
  "/update/:categoryId",
  authMiddleware(UserRole.ADMIN),
  upload.single("attachment"),
  CategoryControllers.updateCategoryFields
);

router.delete("/delete/:categoryId", authMiddleware(UserRole.ADMIN), CategoryControllers.deleteCategoryById);

router.get("/trending", CategoryControllers.getTrendingCategories);

const CategoryRoutes = router;

export default CategoryRoutes;
