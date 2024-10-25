import { CategoryLevel } from "@repo/prisma/client";

export type TCategoryInput = {
  categoryName: string;
  description: string;
  level: CategoryLevel;
  parentId?: string;
};
