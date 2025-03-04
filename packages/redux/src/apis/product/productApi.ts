import { IApiResponse, TProduct } from "@repo/utils/types";
import { baseApi } from "../baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // queries

    // GET pending products
    getPendingProducts: builder.query<IApiResponse<TProduct[]>, void>({
      query: () => ({
        url: `products/pending`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    getAllProducts: builder.query<IApiResponse<TProduct[]>, unknown>({
      query: (query) => ({
        url: `products/?${query}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),

    // mutations
    // POST approve product
    approveProduct: builder.mutation<IApiResponse<{}>, string>({
      query: (productId) => ({
        url: `products/approve/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const { useGetPendingProductsQuery, useGetAllProductsQuery, useApproveProductMutation } = productApi;
