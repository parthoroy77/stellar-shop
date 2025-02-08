import { UserRole } from "@repo/prisma/client";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { OrderControllers } from "./order.controllers";

const router = Router();

// Place an order
router.post("/place", authMiddleware(UserRole.BUYER), OrderControllers.placeOrder);

// Get orders for admin
router.get("/", authMiddleware(UserRole.ADMIN), OrderControllers.getAllOrdersForAdmin);
// update order status
router.put("/:id", authMiddleware(UserRole.ADMIN), OrderControllers.updateOrderStatusForAdmin);

const OrderRoutes = router;

export default OrderRoutes;
