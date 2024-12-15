import { IAddress } from "./address";
import { IFile } from "./file";
import { TUser } from "./user";

export const SellerStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  BLOCKED: "BLOCKED",
} as const;

export type TSellerStatus = (typeof SellerStatus)[keyof typeof SellerStatus];

// Seller Profiles
export interface ISeller {
  id: number;
  userId: number; // Foreign key referencing User
  shopName: string;
  shopDescription: string;
  shopBannerId: number;
  shopLogoId: number;
  contactNumber: string;
  businessEmail?: string;
  status: TSellerStatus;

  createdAt: Date;
  updatedAt?: Date;
}

export type TSeller = ISeller & {
  user?: TUser & { addresses: IAddress[] };
  logo: IFile;
  banner: IFile;
};
