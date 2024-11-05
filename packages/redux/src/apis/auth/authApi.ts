import { IApiResponse, TLoginResponse, TUser } from "@repo/utils/types";
import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // queries
    getAuth: builder.query<IApiResponse<TUser>, undefined>({
      query: () => ({
        url: "/auth/get-me",
      }),
      keepUnusedDataFor: 300,
      providesTags: ["Auth"],
    }),
    // mutations
    userLogin: builder.mutation<IApiResponse<TLoginResponse>, unknown>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),
    userLogOut: builder.mutation<IApiResponse<{}>, undefined>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useUserLoginMutation, useUserLogOutMutation, useGetAuthQuery } = authApi;
