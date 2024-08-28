export const CategoryLevel = {
  COLLECTION: "COLLECTION",
  CATEGORY: "CATEGORY",
  SUB_CATEGORY: "SUB_CATEGORY",
} as const;

export const CategoryStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type TCategoryStatus = (typeof CategoryStatus)[keyof typeof CategoryStatus];

export type CategoryLevels = (typeof CategoryLevel)[keyof typeof CategoryLevel];

// Categories
export interface ICategory {
  id: number;
  categoryName: string;
  urlSlug: string;
  parentCategoryId?: number | null; // Nullable Foreign key referencing Category
  level: CategoryLevels;
  categoryImageUrl?: string;
  status: TCategoryStatus;
  createdAt: string;
  updatedAt?: string | null;
}

export type TCategory = ICategory & {
  subCategories?: TCategory[];
};
