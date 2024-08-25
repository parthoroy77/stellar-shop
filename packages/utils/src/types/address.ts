export const AddressType = {
  HOME: "HOME",
  WORK: "WORK",
} as const;

export type TAddressTypes = (typeof AddressType)[keyof typeof AddressType];

// Addresses
export interface IAddress {
  id: number;
  userId: number; // Foreign key referencing User
  fullAddress: string;
  state: string;
  city: string;
  zipCode: string;
  country: string;
  addressType: TAddressTypes;
  createdAt: Date;
  updatedAt?: Date;
}
