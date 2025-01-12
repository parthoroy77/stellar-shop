"use server";

import { serverFetcher } from "@/lib/server-fetcher";
import { IAttribute, TAttribute } from "@repo/utils/types";

export const getAllAttributes = async () => {
  const result = await serverFetcher<IAttribute[]>("/attributes/");
  return result.data;
};

export const getAllAttributesWithValues = async () => {
  const result = await serverFetcher<TAttribute[]>("/attributes/all");
  return result.data;
};

export const getAttributeValuesById = async (id: string) => {
  const result = await serverFetcher<TAttribute[]>(`/attributes/values/${id}`);
  return result.data;
};
