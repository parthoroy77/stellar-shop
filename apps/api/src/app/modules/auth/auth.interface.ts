export type TRegistrationPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
};
