import { addressValidationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { AddressControllers } from "./address.controllers";

const router = Router();

router.post("/create", authMiddleware(), zodSafeParse(addressValidationSchema), AddressControllers.createAddress);

const AddressRoutes = router;

export default AddressRoutes;
