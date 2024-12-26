import prisma from "@repo/prisma/client";
import { toTitleCase } from "@repo/utils/functions";

const create = async (payload: { name: string }) => {
  await prisma.tag.create({ data: { name: payload.name } });
  return;
};

const bulkCreate = async (payload: { values: string[] }) => {
  await prisma.tag.createMany({
    data: payload.values.map((value) => ({
      name: toTitleCase(value),
    })),
  });
};

const getAll = async () => {
  const result = await prisma.tag.findMany({ select: { id: true, name: true } });
  return result;
};

export const TagServices = { create, bulkCreate, getAll };
