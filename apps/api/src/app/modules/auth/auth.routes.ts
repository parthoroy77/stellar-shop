import { loginSchema, registrationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import { AuthControllers } from "./auth.controllers";
import { resendVerificationEmailSchema, verifyAccountSchema } from "./auth.schema";

const AuthRoutes = Router();

AuthRoutes.post("/register", zodSafeParse(registrationSchema), AuthControllers.userRegistration);
AuthRoutes.post("/login", zodSafeParse(loginSchema), AuthControllers.userLogin);
AuthRoutes.post(
  "/resend-verification",
  zodSafeParse(resendVerificationEmailSchema),
  AuthControllers.resendUserVerificationEmail
);
AuthRoutes.post("/verify-account", zodSafeParse(verifyAccountSchema), AuthControllers.verifyUserEmail);

export default AuthRoutes;
