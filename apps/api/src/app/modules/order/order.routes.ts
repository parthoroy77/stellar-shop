import { UserRole } from "@repo/prisma/client";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { OrderControllers } from "./order.controllers";

const router = Router();

// Place an order
router.post("/place", authMiddleware(UserRole.BUYER), OrderControllers.placeOrder);

// Get orders for admin
router.get("/", authMiddleware(UserRole.ADMIN), OrderControllers.getAllOrdersForAdmin);

const OrderRoutes = router;

export default OrderRoutes;
