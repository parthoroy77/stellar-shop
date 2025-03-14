import { IApiResponse, TAttribute } from "@repo/utils/types";
import { TAttributeValidationSchema } from "@repo/utils/validations";
import { baseApi } from "../baseApi";

const attributeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // mutations
    addAttribute: builder.mutation<IApiResponse<{}>, TAttributeValidationSchema>({
      query: (data) => ({
        url: `/attributes/`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["attributes"],
    }),

    // queries
    getAllAttributesWithValues: builder.query<IApiResponse<TAttribute[]>, void>({
      query: () => ({
        url: `/attributes/all`,
        method: "GET",
      }),
      providesTags: ["attributes"],
    }),
  }),
});

export const {
  // mutations
  useAddAttributeMutation,
  // queries
  useGetAllAttributesWithValuesQuery,
} = attributeApi;
