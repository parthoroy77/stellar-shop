import { TAddressInput } from "../address/address.types";

export type TOnboardingInput = {
  shopName: string;
  shopDescription: string;
  contactNumber: string;
  businessEmail?: string;
} & TAddressInput;

export type TSellerFilters = {
  query?: string;
  status?: string;
};
