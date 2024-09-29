import cors, { CorsOptions } from "cors";
import { Application } from "express";
import config from "../config";

// List of allowed origins (add multiple frontend's here)
const allowedOrigins: string[] = [config.origin_url_1 as string];

// Configure CORS
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      // If origin is undefined, like in server-to-server requests, allow it
      return callback(null, true);
    }

    // Sanitize and check if the origin is allowed
    const sanitizedOrigin = origin.replace(/\/$/, ""); // Remove trailing slashes
    if (allowedOrigins.includes(sanitizedOrigin)) {
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

// Apply the CORS middleware to your application
export const applyCors = (app: Application) => {
  app.use(cors(corsOptions));
};