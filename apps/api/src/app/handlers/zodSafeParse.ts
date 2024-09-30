import { AnyZodObject } from "@repo/utils/validations";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "./asyncHandler";

const zodSafeParse = (schema: AnyZodObject) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      ...req.body,
      ...req.cookies,
    });
    next();
  });
};

export const zodCookieParse = (schema: AnyZodObject) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      cookies: req.cookies,
    });
    next();
  });
};

export default zodSafeParse;
