export interface ExtendedFile extends File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export type TLabelValuePair = {
  label: string;
  value: string;
};
