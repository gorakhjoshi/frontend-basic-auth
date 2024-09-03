import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'
import { AppDispatch, RootState } from '../../app/store'
import { AuthState, User } from '../../types/types'
import { authApiSlice } from './authApiSlice'

const authLocalStorage = localStorage.getItem('isAuth')

export const refreshTokenAndSetCredentials = () => async (dispatch: AppDispatch) => {
  try {
    const response = await dispatch(authApiSlice.endpoints.getRefreshToken.initiate())
    console.log(response)
    if (response.isSuccess) {
      dispatch(setCredentials(response.data))
      return response
    }
  } catch (error) {
    console.log(error)
  }
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuth: authLocalStorage ? authLocalStorage : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem('isAuth', 'true')
      state.isAuth = 'true'
      state.token = action.payload.accessToken
      const decodeUser = jwtDecode<User>(action.payload.accessToken)
      if (decodeUser) {
        state.user = decodeUser
      }
    },
    setLogOut: (state) => {
      localStorage.removeItem('isAuth')
      state.isAuth = null
      state.token = null
      state.user = null
    },
  },
})

export const { setCredentials, setLogOut } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token
export const isAuthenticated = (state: RootState) => state.auth.isAuth
