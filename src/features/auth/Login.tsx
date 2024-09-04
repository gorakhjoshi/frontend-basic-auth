import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { isLoading, isError }] = useLoginMutation()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const userData = await login({ email, password }).unwrap()
      console.log(userData)
      dispatch(setCredentials(userData))
      setEmail('')
      setPassword('')
      navigate('/welcome')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="flex justify-center mt-20">
      <div className="border p-5 rounded-md shadow-md">
        <h1 className="text-center text-xl font-bold text-neutral-700 mb-4">Login</h1>

        {isError ? <p className="mb-1.5 text-red-500 tracking-tighter">Something Went Wrong!</p> : ''}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="text-neutral-700 font-medium tracking-tighter">username</label>
            <input type="text" className="border border-neutral-400 text-neutral-700 ml-2 rounded-sm px-1 py-0.5" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
          </div>
          <div>
            <label className="text-neutral-700 font-medium tracking-tighter">password</label>
            <input
              type="password"
              className="border border-neutral-400 text-neutral-700 ml-2 rounded-sm px-1 py-0.5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-center">
            {isLoading ? (
              <p className="mt-3 text-teal-500 font-medium tracking-tighter">Loading...</p>
            ) : (
              <button className="mt-3 border bg-teal-500 text-white font-medium py-1 w-full rounded-md hover:bg-teal-400" disabled={isLoading}>
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
