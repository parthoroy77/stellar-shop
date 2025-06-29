import { IApiResponse, TPlatformInsights } from "@repo/utils/types";
import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // queries
    // get all sellers with filters and pagination
    getPlatformInsights: builder.query<IApiResponse<TPlatformInsights>, void>({
      query: () => ({
        url: `/analytics/platform`,
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const {
  // queries
  useGetPlatformInsightsQuery,
  // mutations
} = dashboardApi;
