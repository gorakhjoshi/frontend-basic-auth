import { useEffect } from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import { Link, useNavigate } from 'react-router-dom'

const UsersList = () => {
  const navigate = useNavigate()

  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery()

  useEffect(() => {
    if (!isLoading && isError && error) {
      alert('You do not have access to this page')
      navigate('/welcome')
    }
  }, [isError, navigate, isLoading, error])

  let content
  if (isLoading) {
    content = <p>Loading....</p>
  } else if (isSuccess) {
    content = (
      <ul>
        {users?.data?.map((user, i) => {
          return <li className="text-neutral-600 font-medium tracking-tight" key={i}>{`${i + 1}. ${user?.username}`}</li>
        })}
      </ul>
    )
  }

  return (
    <section className="flex justify-center mt-20">
      <div className="border p-5 rounded-md border-neutral-200">
        <h1 className="text-xl font-bold text-neutral-700 text-center">Users List</h1>
        <div className="my-4">{content}</div>
        <div className="text-center">
          <Link to="/welcome" className="text-neutral-600 font-medium hover:text-teal-500">
            {'<- Back to welcome'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default UsersList
