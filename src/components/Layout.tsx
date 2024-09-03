import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { isAuthenticated, setLogOut } from '../features/auth/authSlice'
import { useLogoutMutation } from '../features/auth/authApiSlice'

const Layout = () => {
  const isAuth = useAppSelector(isAuthenticated)
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()

  useEffect(() => {
    if (isAuth !== 'true') {
      try {
        logout()
        dispatch(setLogOut())
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  return <Outlet />
}

export default Layout
