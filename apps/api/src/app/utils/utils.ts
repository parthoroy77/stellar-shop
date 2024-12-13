import { Request } from "express";

export function getFilePath(req: Request, fieldName: string): string | undefined {
  return (req.files as Record<string, Express.Multer.File[]>)[fieldName]?.[0]?.path;
}
