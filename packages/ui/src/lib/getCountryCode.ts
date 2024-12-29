import { parsePhoneNumberFromString } from "libphonenumber-js";

const getCountryCode = (phoneNumber: string) => {
  const phoneNumberObj = parsePhoneNumberFromString(phoneNumber || "");
  if (phoneNumberObj) {
    return phoneNumberObj.countryCallingCode;
  }
};

export { getCountryCode };
