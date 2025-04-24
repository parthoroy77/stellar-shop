import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { PaymentControllers } from "./payment.controllers";

const router = Router();

router.post("/order/:orderId", authMiddleware(), PaymentControllers.initiatePayment);

const PaymentRoutes = router;

export default PaymentRoutes;
