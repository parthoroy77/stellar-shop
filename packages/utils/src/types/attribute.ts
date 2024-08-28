export const AttributeType = {
  STRING: "STRING",
  NUMBER: "NUMBER",
  BOOLEAN: "BOOLEAN",
  DATE: "DATE",
  SELECT: "SELECT",
} as const;

export type TAttributeTypes = (typeof AttributeType)[keyof typeof AttributeType];

// Attributes
export interface IAttribute {
  id: number;
  name: string;
  description?: string;
  type: TAttributeTypes;
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
