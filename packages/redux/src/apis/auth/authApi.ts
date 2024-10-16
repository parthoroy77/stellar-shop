import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login mutation
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useUserLoginMutation } = authApi;
