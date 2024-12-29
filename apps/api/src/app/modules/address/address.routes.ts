import { addressValidationSchema, shippingAddressValidationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { AddressControllers } from "./address.controllers";

const router = Router();

// Address Routes
router.get("/", authMiddleware(), AddressControllers.getAllUserAddresses);
router.post("/", authMiddleware(), zodSafeParse(addressValidationSchema), AddressControllers.createUserAddress);
router.patch(
  "/:id",
  authMiddleware(),
  zodSafeParse(addressValidationSchema.partial()),
  AddressControllers.updateUserAddress
);
router.delete("/:id", authMiddleware(), AddressControllers.deleteUserAddress);

// Shipping Address Routes
router.get("/shippings", authMiddleware(), AddressControllers.getAllUserShippingAddresses);
router.post(
  "/shippings",
  authMiddleware(),
  zodSafeParse(shippingAddressValidationSchema),
  AddressControllers.createUserShippingAddress
);
router.patch(
  "/shippings/:id",
  authMiddleware(),
  zodSafeParse(shippingAddressValidationSchema.partial()),
  AddressControllers.updateUserShippingAddress
);
router.delete("/shippings/:id", authMiddleware(), AddressControllers.deleteUserShippingAddress);

const AddressRoutes = router;

export default AddressRoutes;
