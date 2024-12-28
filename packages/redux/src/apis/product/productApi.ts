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
  }),
});

export const { useGetPendingProductsQuery } = productApi;
