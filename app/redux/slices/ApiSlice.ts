// src/services/apiSlice.ts
import { LoginResponse } from '@/app/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ApiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7012/api/v1',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { username: string; password: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = ApiSlice;
