import { apiSlice } from '../../app/api/apiSlice'
import { LogoutResponse, ResponseData, TokenResponse, UserCredentials } from '../../types/types'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseData, UserCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    getRefreshToken: builder.query<TokenResponse, void>({
      query: () => '/auth/token',
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useLoginMutation, useGetRefreshTokenQuery, useLogoutMutation } = authApiSlice
