import prisma, { Prisma } from "@repo/prisma/client";
import { uploadFileToCloudinaryAndCreateRecord } from "../../handlers/handleCloudUpload";
import { BRAND_SEARCHABLE_FIELDS } from "./brand.constants";
import { TBrandInput } from "./brand.types";

const create = async ({ name, description }: TBrandInput, filePath: string, userId: number) => {
  const uploadedFile = await uploadFileToCloudinaryAndCreateRecord(filePath, "brands", userId);

  const result = await prisma.brand.create({
    data: {
      name,
      fileId: uploadedFile.fileRecord.id,
      description: description || null,
    },
  });

  return result;
};

const getAll = async (query?: string) => {
  const whereClauses: Prisma.BrandWhereInput = {};
  if (query) {
    whereClauses.OR = BRAND_SEARCHABLE_FIELDS.map((field) => ({
      [field]: {
        contains: query,
        mode: "insensitive",
      },
    }));
  }

  const result = await prisma.brand.findMany({
    where: whereClauses,
    include: { file: { select: { fileUrl: true, fileSecureUrl: true } } },
  });

  return result;
};

export const BrandServices = {
  create,
  getAll,
};
