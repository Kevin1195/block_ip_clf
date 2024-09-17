import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

const headers = {
  "x-access-token": sessionStorage.getItem("auth"),
};

import { baseUrl } from "../../domainName";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({ url: userInfo, headers: headers() }),
      transformResponse: (res) => {
        if (res.status === "error" && res.message === "Invalid token") {
          return false;
        } else {
          return res;
        }
      },
      transformErrorResponse: (res) => res.status,
      providesTags: ["User"],
    }),

    UserLogin: builder.mutation({
      query: (payload) => ({
        url: `${baseUrl}/api/portal/login`,
        method: "POST",
        body: payload,
      }),
    }),
    BlockIP: builder.mutation({
      query: (payload) => ({
        url: `${baseUrl}/api/portal/add/whiteip`,
        method: "POST",
        headers,
        body: payload,
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useUserLoginMutation, useBlockIPMutation } =
  userApi;
