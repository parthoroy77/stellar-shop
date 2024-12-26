import prisma from "@repo/prisma/client";
import { toTitleCase } from "@repo/utils/functions";
import { TAttributeInput } from "./attribute.types";

const create = async (payload: TAttributeInput) => {
  await prisma.attribute.create({
    data: {
      name: toTitleCase(payload.name),
      attributeValues: {
        createMany: {
          data: payload.values.map((value) => ({
            value: toTitleCase(value),
          })),
        },
      },
    },
  });
};

const getAllWithValues = async () => {
  const result = await prisma.attribute.findMany({
    select: {
      id: true,
      name: true,
      attributeValues: { select: { id: true, value: true, attributeId: true } },
    },
  });
  return result;
};

const getAll = async () => {
  const result = await prisma.attribute.findMany({ select: { id: true, name: true } });
  return result;
};

const getAllValuesByAttrId = async (id: number) => {
  const result = await prisma.attributeValue.findMany({
    where: {
      attributeId: id,
    },
    select: { id: true, value: true, attributeId: true },
  });
  return result;
};

export const AttributeServices = {
  create,
  getAll,
  getAllWithValues,
  getAllValuesByAttrId,
};
