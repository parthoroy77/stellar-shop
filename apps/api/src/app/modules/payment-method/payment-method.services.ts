import prisma from "@repo/prisma/client";
import { TPaymentMethodPayload, TPaymentProviderPayload } from "./payment-method.types";

// Admin only
const addProvider = async ({ name, meta }: TPaymentProviderPayload) => {
  await prisma.paymentProvider.create({
    data: { name, metadata: meta ?? null },
  });
};

// Admin only
const addMethod = async ({ name, providerId, description }: TPaymentMethodPayload) => {
  await prisma.paymentMethod.create({
    data: { name, providerId, description: description ?? null },
  });
};

const getPaymentMethods = async () => {
  const result = await prisma.paymentMethod.findMany({
    where: {
      status: "ACTIVE",
    },
  });
  return result;
};

export const PaymentMethodServices = {
  addMethod,
  addProvider,
  getPaymentMethods,
};
