import { IShippingOption, ITag } from "@repo/utils/types";
import { fetcher } from "../fetcher";

export const getAllTags = async () => {
  const result = await fetcher<ITag[]>("/tags/");
  return result.data || [];
};

export const getAllShippingOptions = async () => {
  const result = await fetcher<IShippingOption[]>("/shippings/");
  return result.data || [];
};
