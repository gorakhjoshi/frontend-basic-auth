import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import RequireAuth from './features/auth/RequireAuth'
import Welcome from './features/auth/Welcome'
import UsersList from './features/users/UsersList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public route */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          {/* protected route */}
          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="userslist" element={<UsersList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
