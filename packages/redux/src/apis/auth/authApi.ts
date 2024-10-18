import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // queries
    getAuth: builder.query({
      query: () => ({
        url: "/auth/get-me",
      }),
      keepUnusedDataFor: 300,
      providesTags: ["Auth"],
    }),
    // mutations
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),
    userLogOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useUserLoginMutation, useUserLogOutMutation, useGetAuthQuery } = authApi;
