import { addProductReviewSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { upload } from "../../middleware/multer.middleware";
import { ProductReviewController } from "./product-review.controllers";

const router = Router();

router.post(
  "/",
  authMiddleware("BUYER"),
  zodSafeParse(addProductReviewSchema),
  upload.array("files", 2),
  ProductReviewController.addReviewToProduct
);

const ProductReviewRoutes = router;

export default ProductReviewRoutes;
