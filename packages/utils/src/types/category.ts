export const CategoryLevel = {
  COLLECTION: "COLLECTION",
  CATEGORY: "CATEGORY",
  SUB_CATEGORY: "SUB_CATEGORY",
} as const;

export type CategoryLevels = (typeof CategoryLevel)[keyof typeof CategoryLevel];

// Categories
export interface ICategory {
  id: number;
  categoryName: string;
  urlSlug: string;
  parentCategoryId?: number; // Nullable Foreign key referencing Category
  level: CategoryLevels;
  categoryImageUrl?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt?: Date;
}
