import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type EmailType = "contact" | "partnership" | "order";

export interface SendEmailPayload {
  from: string;
  username: string;
  phone: string;
  message: string;
  type: EmailType;
}

console.log(88888888);
console.log(process.env.REACT_APP_API_BASE_URL);

console.log(888888888);

export const emailApi = createApi({
  reducerPath: "emailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    sendEmail: builder.mutation<void, SendEmailPayload>({
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

export const { useSendEmailMutation } = emailApi;
