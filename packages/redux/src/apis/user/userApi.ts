import { IApiResponse, TUser } from "@repo/utils/types";
import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // queries
    // get all sellers with filters and pagination
    getAllUsers: builder.query<IApiResponse<TUser[]>, string | undefined>({
      query: (query?: string) => ({
        url: `/users/?${query}`,
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  // queries
  useGetAllUsersQuery,
  // mutations
} = userApi;
