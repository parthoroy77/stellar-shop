import { CategoryLevel } from "@repo/prisma/client";

export type TCategoryInput = {
  categoryName: string;
  description: string;
  level: CategoryLevel;
  parentId?: string;
};

export type TCategoryFilters = {
  query?: string;
  level?: string;
  parentId?: string;
  status?: string;
};
