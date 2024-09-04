import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated, refreshTokenAndSetCredentials } from './authSlice'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

const RequireAuth = () => {
  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(isAuthenticated)

  useEffect(() => {
    dispatch(refreshTokenAndSetCredentials())
  }, [dispatch])

  return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default RequireAuth
