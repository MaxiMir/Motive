import { AxiosRequestConfig } from 'axios'
import Axios from 'src/common/lib/axios'
import { UserPageDto } from 'src/common/dto'

export class PageService {
  static get<T>(path: string, options?: AxiosRequestConfig): Promise<T> {
    return Axios.get(`/pages${path}`, options)
  }

  static getUser(path: string, options?: AxiosRequestConfig): Promise<UserPageDto> {
    return Axios.get(`/pages/users${path}`, { ...options, validateStatus: () => true })
  }
}
