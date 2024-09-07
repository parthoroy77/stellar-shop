import { Response } from "express";

type ApiResponseParams<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

const ApiResponse = <T>(res: Response, { statusCode, data, message, success }: ApiResponseParams<T>) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export { ApiResponse };
