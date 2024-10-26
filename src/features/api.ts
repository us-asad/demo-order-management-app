import { RTKTags } from '@/constants/rtk-tags'
import {SERVER_URL} from '@/constants/server-url'
import {storage} from '@/utils/storage'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Mutex} from 'async-mutex'

export const baseUrl = SERVER_URL

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers: any) => {
    const token = storage.getAccessToken()
    const accessToken = token?.split(' ')
    if (token) {
      headers.set('Authorization', `Bearer ${accessToken?.[1]}`)
    }
    headers.set('Accept', 'application/json')
    return headers
  },
})

const customFetchBase = async (args: any, api: any, extraOptions: any) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        result = await baseQuery(args, api, extraOptions)
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: customFetchBase,
  tagTypes: Object.values(RTKTags),
  endpoints: () => ({}),
})
