import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {

  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  const welcome = user ? `Welcome ${user?.username} !` : '....'
  const tokenAbbr = `${token ? token : '....'}`

  return (
    <section className="flex justify-center mt-20">
      <div className="border p-5 rounded-md border-neutral-200">
        <h1 className="text-neutral-600 text-xl">{welcome}</h1>
        <div className="my-4">
          <p className="text-neutral-600 font-medium text-sm">Token : {tokenAbbr.substring(0, 10)}...</p>
          <p className="text-neutral-600 font-medium text-sm">Role : {user ? user.role : '...'}</p>
        </div>
        <div className="flex flex-col text-center">
          <Link
            to='/userslist'
            className="text-neutral-600 font-medium hover:text-teal-500"
          >{'Go to the user Lists ->'}</Link>
          <Link
            to='/'
            className="text-neutral-600 font-medium hover:text-teal-500"
          >{'<- Back to Public'}</Link>
        </div>
      </div>
    </section>
  )
}

export default Welcome