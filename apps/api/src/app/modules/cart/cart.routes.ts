import { UserRole } from "@repo/prisma/client";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { CartControllers } from "./cart.controllers";

const router = Router();

router.post("/", authMiddleware(UserRole.BUYER), CartControllers.manageAddProductToCart);

const CartRoutes = router;
export default CartRoutes;
