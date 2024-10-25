import { ICategoryFile, IFile } from "./file";

export const CategoryLevels = {
  COLLECTION: "COLLECTION",
  CATEGORY: "CATEGORY",
  SUB_CATEGORY: "SUB_CATEGORY",
} as const;

export const CategoryStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type TCategoryStatus = (typeof CategoryStatus)[keyof typeof CategoryStatus];

export type TCategoryLevels = (typeof CategoryLevels)[keyof typeof CategoryLevels];

// Categories
export interface ICategory {
  id: number;
  categoryName: string;
  description: string;
  urlSlug: string;
  parentCategoryId?: number | null; // Nullable Foreign key referencing Category
  level: TCategoryLevels;
  status: TCategoryStatus;
  createdAt: string;
  updatedAt?: string | null;
}

export type TCategory = ICategory & {
  subCategories?: TCategory[];
  images: ICategoryFile &
    {
      file: IFile;
    }[];
};
