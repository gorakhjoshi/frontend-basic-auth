export interface ResponseData {
  status: boolean
  accessToken: string
}

export interface UserCredentials {
  email: string
  password: string
}

interface Role {
  description: string | null
  _id: string
  roleName: string
}

export interface User {
  userId: string
  username: string
  email: string
  roleId: Role
  iat: number
  exp: number
  role: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuth: string | null
}

export interface LogoutResponse {
  status: boolean
  msg: string
}

export interface TokenResponse {
  accessToken: string
}

export interface UserResponse {
  data: User[]
  status: boolean
}
