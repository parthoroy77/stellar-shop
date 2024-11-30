import { UserRole } from "@repo/prisma/client";
import cors, { CorsOptions } from "cors";
import { Application, NextFunction, Request, Response } from "express";
import config from "../config";
export interface IOriginConfig {
  origin: string;
  role: UserRole;
}

// List of allowed origins (add multiple frontend's here)
export const allowedOrigins: IOriginConfig[] = [
  {
    origin: config.origin_url_1!,
    role: UserRole.BUYER,
  },
  {
    origin: config.origin_url_2!,
    role: UserRole.ADMIN,
  },
  {
    origin: config.origin_url_3!,
    role: UserRole.SELLER,
  },
];

// Configure CORS
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // TODO: maybe we should only allow without origin in dev env
    if (!origin) {
      // If origin is undefined, like in server-to-server requests, allow it
      return callback(null, true);
    }

    // Sanitize and check if the origin is allowed
    const sanitizedOrigin = origin.replace(/\/$/, ""); // Remove trailing slashes
    // check origin
    const originConfig = allowedOrigins.find((o) => o.origin === sanitizedOrigin);
    if (originConfig) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error(`CORS Error: ${sanitizedOrigin} not allowed by CORS`)); // Block the request
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials from frontend
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With", // Useful for AJAX requests
  ],
  exposedHeaders: [
    "Content-Length", // Expose certain headers to the frontend
    "X-Kuma-Revision", // You can add your custom headers to expose here
  ],
  preflightContinue: false, // Don't pass preflight response to next handler
  optionsSuccessStatus: 204, // Some browsers send 204 instead of 200 for preflight
};

// set role on req header
export const setRoleFromOriginHeader = (req: Request, _res: Response, next: NextFunction) => {
  const origin = req.get("origin");
  if (origin) {
    const sanitizedOrigin = origin.replace(/\/$/, "");
    const originConfig = allowedOrigins.find((o) => o.origin === sanitizedOrigin);
    if (originConfig) {
      (req as any).originRole = originConfig.role;
    }
  }
  next();
};

// Apply the CORS middleware to your application
export const applyCors = (app: Application) => {
  app.use(cors(corsOptions));
  app.use(setRoleFromOriginHeader);
};
