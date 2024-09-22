import { ZodError, ZodIssue } from "@repo/utils/validations";
import { StatusCodes } from "http-status-codes";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const statusCode = StatusCodes.BAD_REQUEST;
  const message = "Zod Validation error.";
  const errorSources: TErrorSource[] = error.issues.map((issue: ZodIssue): TErrorSource => {
    return {
      message: `${issue.path[1]} is ${issue.message}.`.toLocaleLowerCase(),
      path: `${issue.path[1]}`,
    };
  });

  return {
    message,
    errorSources,
    statusCode,
  };
};

export default handleZodError;
