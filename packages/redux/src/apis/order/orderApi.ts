import { IApiResponse, TOrder } from "@repo/utils/types";
import { baseApi } from "../baseApi";

export type TOrderResponse = TOrder & {
  totalSubOrders: number;
  totalOrderItems: number;
};
const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // queries
    // get all orders with filters and pagination
    getOrders: builder.query<IApiResponse<TOrderResponse[]>, string>({
      query: (query: string) => ({
        url: `/orders/?${query}`,
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const {
  // queries
  useGetOrdersQuery,
  // mutations
} = orderApi;
