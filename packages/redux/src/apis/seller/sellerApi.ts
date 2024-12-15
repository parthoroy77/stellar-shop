import { IApiResponse, TSeller } from "@repo/utils/types";
import { baseApi } from "../baseApi";

const sellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // queries
    // get all sellers with filters and pagination
    getAllSellers: builder.query<IApiResponse<TSeller[]>, string>({
      query: (query: string) => ({
        url: `/sellers/get-all?${query}`,
      }),
      providesTags: ["seller"],
    }),
  }),
});

export const {
  // queries
  useGetAllSellersQuery,
} = sellerApi;
