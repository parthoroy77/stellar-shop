import prisma, { Prisma, ShippingOptionStatus } from "@repo/prisma/client";
import { TShippingOptionFilters, TShippingOptionInput } from "./shipping.types";

const createOption = async ({ name, estimateDays, charge }: TShippingOptionInput) => {
  await prisma.shippingOption.create({
    data: {
      name,
      estimateDays,
      charge: +charge,
    },
  });
  return;
};

const getAllOptions = async ({ query, name, status }: TShippingOptionFilters) => {
  const andClauses: Prisma.ShippingOptionWhereInput[] = [];

  if (query) {
    andClauses.push({
      AND: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
  }
  if (name) {
    andClauses.push({
      AND: {
        name: name,
      },
    });
  }
  if (status) {
    andClauses.push({
      AND: {
        status: status.toUpperCase() as ShippingOptionStatus,
      },
    });
  }

  const finalWhereClause = andClauses.length > 0 ? { AND: andClauses } : {};

  const result = await prisma.shippingOption.findMany({
    where: finalWhereClause,
    select: { id: true, name: true, estimateDays: true },
  });

  return result;
};

export const ShippingServices = {
  createOption,
  getAllOptions,
};
