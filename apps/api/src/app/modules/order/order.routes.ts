import { UserRole } from "@repo/prisma/client";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { OrderControllers } from "./order.controllers";

const router = Router();

// Place an order
router.post("/place", authMiddleware(UserRole.BUYER), OrderControllers.placeOrder);

// Seller specific order routes
router.get("/sellers/", authMiddleware(UserRole.SELLER), OrderControllers.getSellerAllOrders);

const OrderRoutes = router;

export default OrderRoutes;
