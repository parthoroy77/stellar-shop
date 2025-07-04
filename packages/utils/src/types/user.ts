import { TSeller } from "./seller";

// user roles
export const UserRole = {
  BUYER: "BUYER",
  SELLER: "SELLER",
  ADMIN: "ADMIN",
} as const;

export type TUserRoles = (typeof UserRole)[keyof typeof UserRole];

export const UserActivationStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  BLOCKED: "BLOCKED",
} as const;

export type TUserActivationStatus = (typeof UserActivationStatus)[keyof typeof UserActivationStatus];

export interface UserRole {
  id: number;
  roleName: TUserRoles;
  createdAt: Date;
  updatedAt?: Date;
}

// Users
export interface IUser {
  id: number;
  role: string; // Foreign key referencing UserRole
  fullName: string;
  email: string; // Unique
  password: string;
  phoneNumber: string; // Unique
  phonePrefixCode: string; // Country code
  emailVerified: boolean;
  phoneVerified: boolean;
  avatarId?: number;
  avatarUrl?: string;
  status: TUserActivationStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export type TUser = Omit<IUser, "password"> & {
  sellerProfile?: TSeller;
};
