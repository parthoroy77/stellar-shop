import { ZodError } from "@repo/utils/validations";
import { ErrorRequestHandler } from "express";
import config from "../config";
import { ApiError } from "./ApiError";
import handleApiError from "./handleAppError";
import handleZodError from "./handleZodError";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  const success = false;
  let statusCode = 500;
  let message = error.message || "Internal Server Error";

  let errorSources = null;

  // handle zod error
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  //handle instance of app error
  if (error instanceof ApiError) {
    const simplifiedError = handleApiError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  }
  // send response
  res.status(statusCode).json({
    success,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? error?.stack : null,
  });
};

export default globalErrorHandler;
