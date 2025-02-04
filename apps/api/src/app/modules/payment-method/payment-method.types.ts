export type TPaymentProviderPayload = {
  name: string;
  meta?: any;
};

export type TPaymentMethodPayload = {
  name: string;
  providerId: number;
  description?: string;
};
