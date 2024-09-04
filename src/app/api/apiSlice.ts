import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { setCredentials, setLogOut } from '../../features/auth/authSlice'
import { RootState } from '../../types/types'

const baseUrl = import.meta.env.VITE_ENV === 'DEVELOPMENT' ? 'http://localhost:3000/api' : 'https://gorakhauth.onrender.com/api'

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state.auth.token
    console.log(token)

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  console.log(args)
  console.log(api)
  console.log(extraOptions)
  let result = await baseQuery(args, api, extraOptions)
  console.log(result)

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
