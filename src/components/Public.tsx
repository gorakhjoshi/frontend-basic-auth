import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isAuthenticated, setLogOut } from '../features/auth/authSlice'
import { useLogoutMutation } from '../features/auth/authApiSlice'

const Public = () => {
  const isAuth = useSelector(isAuthenticated)
  const dispatch = useDispatch()

  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logout()
      dispatch(setLogOut())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="flex justify-center mt-20">
      <div className="border p-4 text-center rounded-md shadow-md">
        <h1 className="text-xl font-bold text-neutral-700 tracking-wide">Public Page</h1>
        {isAuth ? (
          <>
            <div className="flex flex-col">
              <Link to="/welcome" className="my-4 text-neutral-600 font-medium hover:text-teal-500">
                {'Go to Welcome ->'}
              </Link>
              <button onClick={handleLogout} className="border bg-red-500 p-2 rounded-md font-medium text-white hover:bg-red-400">
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="mt-5">
            <Link to={'/login'} className="border bg-teal-500 p-2 rounded-md font-medium text-white hover:bg-teal-400">
              Login
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Public
