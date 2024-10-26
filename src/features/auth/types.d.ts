import {User} from '@/types'
import {DefaultSuccessResponse} from '../types'

export interface LoginRequestBody {
  username: string
  password: string
}
export interface LoginRequest {
  body: LoginRequestBody
}
export interface LoginResponse extends DefaultSuccessResponse {
  data: string
}

export interface GetUserRequest {}
export interface GetUserResponse extends DefaultSuccessResponse {
  data: User
}
