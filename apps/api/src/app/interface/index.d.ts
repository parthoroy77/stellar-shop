import { User } from "@repo/prisma/client";
interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
// Define an interface for certificate data
interface CertificateData {
  name: string;
  mark: string;
  // Add other data properties as needed
}

declare global {
  namespace Express {
    interface Request {
      user: Partial<User>;
      file: File;
      originRole: string;
    }
  }
}
