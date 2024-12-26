import { UserRole } from "@repo/prisma/client";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { upload } from "../../middleware/multer.middleware";
import { BrandControllers } from "./brand.controllers";

const router = Router();

router.post("/", authMiddleware(UserRole.SELLER, UserRole.ADMIN), upload.single("logo"), BrandControllers.createBrand);
router.get("/", BrandControllers.getAllBrands);

const BrandRoutes = router;

export default BrandRoutes;
