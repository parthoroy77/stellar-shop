import { IApiResponse, TLoginResponse, TUser } from "@repo/utils/types";
import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // queries
    getAuth: builder.query<IApiResponse<TUser>, undefined>({
      query: () => ({
        url: "/auth/me",
      }),
      keepUnusedDataFor: 300,
      providesTags: ["auth"],
    }),
    // mutations
    adminLogin: builder.mutation<IApiResponse<TLoginResponse>, unknown>({
      query: (data) => ({
        url: "/auth/admin-login",
        method: "POST",
        data,
      }),
      invalidatesTags: ["auth"],
    }),
    userLogOut: builder.mutation<IApiResponse<{}>, undefined>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useAdminLoginMutation, useUserLogOutMutation, useGetAuthQuery } = authApi;
