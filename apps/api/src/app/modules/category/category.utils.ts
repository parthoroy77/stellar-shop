import { Prisma } from "@repo/prisma/client";
import calculatePagination, { TPaginateOption } from "../../utils/calculatePagination";
import { CATEGORY_SEARCHABLE_KEYS } from "./category.constant";
import { TCategoryFilters } from "./category.types";

export const getCategoryBaseQuery = (filters: TCategoryFilters, options: TPaginateOption) => {
  const paginateOptions = calculatePagination(options);

  const { query, ...filterData } = filters;

  const andClauses: Prisma.CategoryWhereInput[] = [];

  if (query) {
    andClauses.push({
      OR: CATEGORY_SEARCHABLE_KEYS.map((key) => ({
        [key]: {
          contains: query,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andClauses.push({
      AND: Object.entries(filterData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const finalWhereClause: Prisma.CategoryWhereInput = andClauses.length > 0 ? { AND: andClauses } : {};

  return {
    finalWhereClause,
    ...paginateOptions,
  };
};

const CATEGORY_IMAGE_INCLUDE = {
  images: {
    include: {
      file: true,
    },
  },
};
