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

export type TCategoryUpdate = {
  categoryId: string;
  categoryName?: string;
  level?: string;
  parentId?: string;
  status?: string;
  description?: string;
};
