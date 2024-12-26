export interface IAttribute {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Attribute Values
export interface IAttributeValue {
  id: number;
  value: string;
  attributeId: number; // Foreign key referencing Attribute
  createdAt: Date;
  updatedAt?: Date;
}

export type TAttribute = IAttribute & {
  attributeValues?: IAttributeValue[];
};
