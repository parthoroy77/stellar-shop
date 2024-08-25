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
  roleId: number; // Foreign key referencing UserRole
  fullName: string;
  email: string; // Unique
  password: string;
  phoneNumber: string; // Unique
  phonePrefixCode: string; // Country code
  emailVerified: boolean;
  phoneVerified: boolean;
  profilePictureUrl?: string;
  status: TUserActivationStatus;
  createdAt: Date;
  updatedAt?: Date;
}
