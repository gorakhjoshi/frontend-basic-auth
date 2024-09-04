import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Public from './components/Public'
import Login from './features/auth/Login'
import RequireAuth from './features/auth/RequireAuth'
import Welcome from './features/auth/Welcome'
import UsersList from './features/users/UsersList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public route */}
        <Route path="/" element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected route */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="userslist" element={<UsersList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
