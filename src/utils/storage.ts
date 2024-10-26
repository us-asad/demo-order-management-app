import {AuthStorageKeys} from '@/constants/storage-keys'

class Storage {
  public removeAccessToken() {
    localStorage.removeItem(AuthStorageKeys.ACCESS_TOKEN)
  }

  public getAccessToken() {
    return localStorage.getItem(AuthStorageKeys.ACCESS_TOKEN)
  }

  public setAccessToken(token: string) {
    localStorage.setItem(AuthStorageKeys.ACCESS_TOKEN, `Bearer ${token}`)
  }
}

export const storage = new Storage()
