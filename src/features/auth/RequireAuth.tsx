import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated, refreshTokenAndSetCredentials } from './authSlice'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getCookie } from '../../utils/utils'

const RequireAuth = () => {
  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(isAuthenticated)

  // Get the value of 'refreshToken'
  const myCookieValue = getCookie('refreshToken')

  console.log(myCookieValue)

  useEffect(() => {
    // if (!myCookieValue) {
    //   dispatch(setLogOut())
    // } else {
    dispatch(refreshTokenAndSetCredentials())
    // }
  }, [dispatch])

  return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default RequireAuth
