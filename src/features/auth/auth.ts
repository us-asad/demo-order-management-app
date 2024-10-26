import {EndpointNameAuth} from '@/constants/endpoints'
import {baseApi} from '..'
import {
  GetUserRequest,
  GetUserResponse,
  LoginRequest,
  LoginResponse,
} from './types'
import {RTKTags} from '@/constants/rtk-tags'

export const AuthExtendedEndpoints = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({body}) => ({
        url: EndpointNameAuth.LOGIN,
        method: 'POST',
        body,
      }),
    }),

    getUser: build.query<GetUserResponse, GetUserRequest>({
      query: () => ({
        url: EndpointNameAuth.GET_USER,
        method: 'GET',
      }),
      providesTags: [RTKTags.USER],
    }),
  }),
})

export const { useLoginMutation, useGetUserQuery} =
  AuthExtendedEndpoints
