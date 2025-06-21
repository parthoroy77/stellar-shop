import { UserRole } from "@repo/prisma/client";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { upload } from "../../middleware/multer.middleware";
import { ProductControllers } from "./product.controllers";

const router = Router();

router.get("/new-arrivals", ProductControllers.getAllNewlyArrivedProducts);
router.get("/search", ProductControllers.getAllProductsByQuery);
router.get("/pending", authMiddleware(UserRole.ADMIN), ProductControllers.getAllPendingProducts);
router.post("/", authMiddleware(UserRole.ADMIN, UserRole.SELLER), upload.any(), ProductControllers.createProduct);
router.post("/approve/:productId", authMiddleware(UserRole.ADMIN), ProductControllers.approveProduct);
router.get("/id/:id", ProductControllers.getProductById);
router.get("/slug/:slug", ProductControllers.getProductBySlug);
router.get("/seller/:sellerId", authMiddleware("ADMIN", "SELLER"), ProductControllers.getAllSellerProducts);
router.get("/", authMiddleware("ADMIN"), ProductControllers.getAllProducts);
router.get("/category/:categorySlug", ProductControllers.getAllProductsByCategory);

const ProductRoutes = router;

export default ProductRoutes;
