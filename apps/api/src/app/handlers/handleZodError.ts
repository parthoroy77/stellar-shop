import { ZodError, ZodIssue } from "@repo/utils/validations";
import { StatusCodes } from "http-status-codes";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const statusCode = StatusCodes.BAD_REQUEST;
  const message = "Zod Validation error.";
  console.log(error.issues);
  const errorSources: TErrorSource[] = error.issues.map((issue: ZodIssue): TErrorSource => {
    return {
      message: `${issue.path[0]} is ${issue.message}.`,
      path: `${issue.path[0]}`,
    };
  });

  return {
    message,
    errorSources,
    statusCode,
  };
};

export default handleZodError;
