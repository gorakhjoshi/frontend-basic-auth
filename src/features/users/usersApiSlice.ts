import { apiSlice } from '../../app/api/apiSlice'
import { UserResponse } from '../../types/types'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse, void>({
      query: () => '/users',
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetUsersQuery } = usersApiSlice
