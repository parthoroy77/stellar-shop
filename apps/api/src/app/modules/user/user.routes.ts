import { userProfileUpdateValidation } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { UserControllers } from "./user.controllers";

const router = Router();

router.patch("/update", authMiddleware(), zodSafeParse(userProfileUpdateValidation), UserControllers.updateUserProfile);

const UserRoutes = router;
export default UserRoutes;
