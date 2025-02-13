import { UserRole } from "@repo/prisma/client";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { OrderControllers } from "./order.controllers";

const router = Router();

// Place an order
router.post("/place", authMiddleware(UserRole.BUYER), OrderControllers.placeOrder);

// Get orders for admin
router.get("/", authMiddleware(UserRole.ADMIN), OrderControllers.getAllOrdersForAdmin);
// Get order detail
router.get("/:id", authMiddleware(UserRole.ADMIN), OrderControllers.getOrderDetailsForAdmin);
// update order status
router.put("/:id", authMiddleware(UserRole.ADMIN), OrderControllers.updateOrderStatusForAdmin);

// Buyer specific routes
router.get("/buyer", authMiddleware(UserRole.BUYER), OrderControllers.getAllBuyerOrders);

const OrderRoutes = router;

export default OrderRoutes;
