import { UserRole } from "@repo/prisma/client";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { upload } from "../../middleware/multer.middleware";
import { ProductControllers } from "./product.controllers";

const router = Router();

router.post("/", authMiddleware(UserRole.ADMIN, UserRole.SELLER), upload.any(), ProductControllers.createProduct);
router.get("/pending", authMiddleware(UserRole.ADMIN), ProductControllers.getAllPendingProducts);

const ProductRoutes = router;

export default ProductRoutes;
