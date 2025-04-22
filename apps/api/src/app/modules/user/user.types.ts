export type TUpdateProfileInput = {
  fullName?: string;
  phoneNumber?: string;
  phonePrefixCode?: string;
};

export type TUserFilters = {
  query?: string;
  role?: string;
  status?: string;
};
