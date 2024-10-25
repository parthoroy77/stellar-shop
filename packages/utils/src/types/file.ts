export const FileType = {
  IMAGE: "IMAGE",
  PDF: "PDF",
  VIDEO: "VIDEO",
} as const;

export const FileStatus = {
  ACTIVE: "ACTIVE",
  ARCHIVED: "ARCHIVED",
  DELETED: "DELETED",
} as const;

export type TFileTypes = (typeof FileType)[keyof typeof FileType];
export type TFileStatus = (typeof FileStatus)[keyof typeof FileStatus];

// File
export interface IFile {
  id: number;
  fileName: string;
  description?: string;
  fileType: TFileTypes;
  filePublicId: string;
  fileSize: number;
  fileUrl: string;
  fileSecureUrl: string;
  uploadedBy: number; // Foreign key referencing User
  status: TFileStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ICategoryFile {
  id: number;
  categoryId: number;
  fileId: number;
  createdAt: Date;
  updatedAt?: Date;
}
export interface IProductFile {
  id: number;
  categoryId: number;
  fileId: number;
  createdAt: Date;
  updatedAt?: Date;
}
export interface IVariantFile {
  id: number;
  categoryId: number;
  fileId: number;
  createdAt: Date;
  updatedAt?: Date;
}
