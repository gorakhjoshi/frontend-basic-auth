import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { setCredentials, setLogOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://gorakhauth.onrender.com/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state.auth.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 401) {
    console.log('sending refresh token')
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/token', api, extraOptions)
    if (refreshResult?.data) {
      const apiRes = api.getState() as RootState
      const user = apiRes.auth.user
      //store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(setLogOut())
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
