import { IApiResponse, TCategory } from "@repo/utils/types";
import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // mutations
    createCategory: builder.mutation<IApiResponse<TCategory>, unknown>({
      query: (data) => ({
        url: `/categories/create`,
        method: "POST",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategoryById: builder.mutation<IApiResponse<{}>, string>({
      query: (categoryId) => ({
        url: `/categories/delete-category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),

    // queries
    getAllCategoryWithChildren: builder.query<IApiResponse<TCategory[]>, undefined>({
      query: () => ({
        url: `/categories/get-all-with-children`,
      }),
      providesTags: ["categories"],
    }),
    getAllCategories: builder.query<IApiResponse<TCategory[]>, unknown>({
      query: (query) => ({
        url: `/categories/get-all?${query}`,
      }),
      providesTags: ["categories"],
    }),
    getAllParentCategories: builder.query<IApiResponse<TCategory[]>, string>({
      query: (query) => ({
        url: `/categories/get-all-parents?${query}`,
      }),
      providesTags: ["categories"],
    }),
  }),
});

export const {
  // mutations
  useCreateCategoryMutation,
  useDeleteCategoryByIdMutation,
  // queries
  useGetAllCategoriesQuery,
  useGetAllCategoryWithChildrenQuery,
  useGetAllParentCategoriesQuery,
} = categoryApi;
