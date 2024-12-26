"use client";
import { IAttribute, TAttribute } from "@repo/utils/types";
import { fetcher } from "../fetcher";

export const getAllAttributes = async () => {
  const result = await fetcher<IAttribute[]>("/attributes/");
  return result.data;
};

export const getAllAttributesWithValues = async () => {
  const result = await fetcher<TAttribute[]>("/attributes/all");
  return result.data;
};

export const getAttributeValuesById = async (id: string) => {
  const result = await fetcher<TAttribute[]>(`/attributes/values/${id}`);
  return result.data;
};
