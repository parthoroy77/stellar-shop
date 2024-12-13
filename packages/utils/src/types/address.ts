export const AddressType = {
  HOME: "HOME",
  WORK: "WORK",
  BUSINESS: "BUSINESS",
} as const;

export type TAddressTypes = (typeof AddressType)[keyof typeof AddressType];

// Addresses
export interface IAddress {
  id: number;
  userId: number; // Foreign key referencing User
  fullAddress: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  type: TAddressTypes;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
