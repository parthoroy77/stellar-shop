import { registrationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import { AuthControllers } from "./auth.controllers";

const AuthRoutes = Router();

AuthRoutes.post("/register", zodSafeParse(registrationSchema), AuthControllers.userRegistration);

export default AuthRoutes;
