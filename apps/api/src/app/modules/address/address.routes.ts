import { addressValidationSchema, shippingAddressValidationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { AddressControllers } from "./address.controllers";

const router = Router();

router.get("/", authMiddleware(), AddressControllers.getAllUserAddresses);
router.post("/", authMiddleware(), zodSafeParse(addressValidationSchema), AddressControllers.createUserAddress);
router.post(
  "/shippings",
  authMiddleware(),
  zodSafeParse(shippingAddressValidationSchema),
  AddressControllers.createUserShippingAddress
);
router.get("/shippings", authMiddleware(), AddressControllers.getAllUserShippingAddresses);

const AddressRoutes = router;

export default AddressRoutes;
