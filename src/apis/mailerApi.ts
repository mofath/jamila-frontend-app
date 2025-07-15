import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mailerApi = createApi({
  reducerPath: "emailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    sendEmail: builder.mutation<void, any>({
      query: (body) => ({
        url: "/send-email",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useSendEmailMutation } = mailerApi;
