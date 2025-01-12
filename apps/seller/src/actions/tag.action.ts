"use server";
import { fetcher } from "@/lib/fetcher";
import { ITag } from "@repo/utils/types";

export const getAllTags = async () => {
  const result = await fetcher<ITag[]>("/tags/");
  return result.data || [];
};
