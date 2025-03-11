import { IApiResponse, TAttribute } from "@repo/utils/types";
import { baseApi } from "../baseApi";

const attributeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAttributesWithValues: builder.query<IApiResponse<TAttribute[]>, void>({
      query: () => ({
        url: `/attributes/all`,
        method: "GET",
      }),
      providesTags: ["attributes"],
    }),
  }),
});

export const { useGetAllAttributesWithValuesQuery } = attributeApi;
