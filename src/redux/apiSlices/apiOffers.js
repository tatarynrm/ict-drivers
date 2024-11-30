import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../utils/axios";

export const offersApi = createApi({
  reducerPath: "offersApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: ({ page = 1, limit = 10 }) => `offers?page=${page}&limit=${limit}`,
    }),
  }),
});

export const offersReducer = offersApi.reducer;
export const { useGetOffersQuery } = offersApi;
