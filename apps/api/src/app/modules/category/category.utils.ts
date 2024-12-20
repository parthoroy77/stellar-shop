import { CategoryLevel, Prisma } from "@repo/prisma/client";
import calculatePagination, { TPaginateOption } from "../../utils/calculatePagination";
import { CATEGORY_SEARCHABLE_KEYS } from "./category.constant";
import { TCategoryFilters } from "./category.types";

export const getCategoryBaseQuery = (filters: TCategoryFilters, options: TPaginateOption) => {
  const paginateOptions = calculatePagination(options);

  const { parentId, level, query, ...filterData } = filters;

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

  if (level) {
    const levelsArray = level.split(",");
    andClauses.push({
      level: {
        in: levelsArray.map((x) => x.toUpperCase()) as CategoryLevel[],
      },
    });
  }

  if (parentId) {
    andClauses.push({
      AND: {
        parentCategoryId: {
          equals: Number(parentId),
        },
      },
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

export const CATEGORY_IMAGE_INCLUDE = {
  images: {
    include: {
      file: true,
    },
  },
};
