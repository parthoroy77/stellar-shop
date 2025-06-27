import { addProductReviewSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { upload } from "../../middleware/multer.middleware";
import { ProductReviewController } from "./product-review.controllers";

const router = Router();

// Configure multer specifically for product reviews (max 2 images)
const reviewUpload = upload.array("files", 2);

router.post(
  "/",
  authMiddleware("BUYER"),
  reviewUpload,
  zodSafeParse(addProductReviewSchema),
  ProductReviewController.addReviewToProduct
);

const ProductReviewRoutes = router;

export default ProductReviewRoutes;
