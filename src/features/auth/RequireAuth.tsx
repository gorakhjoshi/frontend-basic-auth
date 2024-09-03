import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated, refreshTokenAndSetCredentials } from './authSlice'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Cookies from 'js-cookie'

const RequireAuth = () => {
  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(isAuthenticated)

  // Get the value of 'refreshToken'
  // const myCookieValue = getCookie('refreshToken')

  const myCookie = Cookies.get('name')
  console.log(myCookie)

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
