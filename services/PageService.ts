import { AxiosRequestConfig } from 'axios'
import Axios from 'lib/axios'
import { UserPageDto } from 'dto'

export default class PageService {
  static get<T>(path: string, options?: AxiosRequestConfig): Promise<T> {
    return Axios.get(`/pages${path}`, options)
  }

  static getUser(path: string, options?: AxiosRequestConfig): Promise<UserPageDto> {
    return Axios.get(`/pages/users${path}`, { ...options, validateStatus: () => true })
  }
}
