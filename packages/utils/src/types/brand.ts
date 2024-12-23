import { IFile } from "./file";
// Brand
export interface IBrand {
  id: number;
  name: string;
  description?: string;
  fileId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type TBrand = IBrand & {
  file: IFile;
};
