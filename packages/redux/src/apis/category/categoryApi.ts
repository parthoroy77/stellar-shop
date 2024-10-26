import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // mutations
    createCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // queries
    getAllCategoryWithChildren: builder.query({
      query: () => ({
        url: `/categories/get-all-with-children`,
      }),
      providesTags: ["Categories"],
    }),
    getAllCategories: builder.query({
      query: (query) => ({
        url: `/categories/get-all?${query}`,
      }),
      providesTags: ["Categories"],
    }),
    getAllParentCategories: builder.query({
      query: (query) => ({
        url: `/categories/get-all-parents?${query}`,
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  // mutations
  useCreateCategoryMutation,
  // queries
  useGetAllCategoriesQuery,
  useGetAllCategoryWithChildrenQuery,
  useGetAllParentCategoriesQuery,
} = categoryApi;
